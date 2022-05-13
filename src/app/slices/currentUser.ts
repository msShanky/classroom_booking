import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { doc, DocumentData, DocumentReference, getDoc, Unsubscribe } from 'firebase/firestore';
import { rooms } from '../../data/mock_rooms';
import { db } from '../../utils/firebase';
import { listenOrders, listenUser, updateClassroomLike, updateUser } from '../../utils/firebase/database';
import { AppDispatch } from '../store';
import { ClassroomState } from './classrooms';

interface BookingOptions {
  roomId: string;
  userId: any;
  room: ClassroomState;
  user?: string;
  slot: string;
  bookingDate: { seconds: number };
  bookedOn: { seconds: number };
  cancelled?: boolean;
  id: string
}

interface UserState {
  email: string;
  id: string;
  image: string;
  name: string;
  provider: string;
  likes: ClassroomState[];
  bookmarks: ClassroomState[];
  orders: BookingOptions[];
}

interface UpdateArrayOptions {
  type: 'bookmarks' | 'likes';
  value: string;
  action: 'remove' | 'add';
}

let unsubscribeUser: Unsubscribe | null = null
let unsubscribeOrders: Unsubscribe | null = null

const initialState = {
  bookmarks: [],
  email: '',
  id: '',
  image: '',
  name: '',
  provider: '',
  likes: [],
  orders: []
} as UserState

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => state = { ...payload, orders: state.orders },
    clearCurrentUser: (state) => state = initialState,
    setOrders: (state, { payload }) => state = { ...state, orders: payload }
  },
})

export const updateUserArray = (function () {
  let likeQueue: string[] = []
  return (options: UpdateArrayOptions) => async (dispatch: AppDispatch, getState: () => { currentUser: UserState }) => {
    try {
      const { type, value, action } = options
      const { currentUser } = getState()

      if (type === 'likes' && likeQueue.includes(value)) return
      if (type === 'likes') likeQueue.push(value)

      let array: DocumentReference<DocumentData>[] = []

      const ref = doc(db, 'classrooms/' + value)

      if (action === 'add') {
        array = [...currentUser[type].map(c => doc(db, 'classrooms/' + c.id)), ref]
      }
      else {
        array = currentUser[type].filter(c => c.id !== value).map(c => doc(db, 'classrooms/' + c.id))
      }

      await updateUser({ id: currentUser?.id, [type]: array })
      if (type === 'likes') await updateClassroomLike({ id: value, value: action === 'add' ? 1 : -1 })
      if (type === 'likes') likeQueue = likeQueue.filter(v => v !== value)
    } catch (error) {
      console.error(error)
    }
  }
})()

export const fetchUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    if (unsubscribeUser) { unsubscribeUser() }
    listenUser(id, async (user, unsubscribe) => {
      let currUser
      if (user[0]) {
        currUser = { ...user[0], likes: <any[]>[], bookmarks: <any[]>[] }
        const likes = user[0].likes
        const bookmarks = user[0].bookmarks
        for (let i = 0; i < likes.length; i++) {
          let classroomRef = likes[i];
          const classroom = await getDoc(classroomRef)
          currUser.likes.push({ ...JSON.parse(JSON.stringify(classroom.data())), id: classroom.id })
        }
        for (let i = 0; i < bookmarks.length; i++) {
          let classroomRef = bookmarks[i];
          const classroom = await getDoc(classroomRef)
          currUser.bookmarks.push({ ...JSON.parse(JSON.stringify(classroom.data())), id: classroom.id })
        }
      }
      unsubscribeUser = unsubscribe
      dispatch(setCurrentUser(currUser))
    })
  } catch (error) {
    console.error(error)
  }
}

export const fetchOrders = (id: string) => async (dispatch: AppDispatch) => {
  try {
    if (unsubscribeOrders) { unsubscribeOrders() }
    listenOrders(id, async (orders, unsubscribe) => {
      const orderArray = []
      for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        if (order.room) {
          const orderRef = await getDoc(order.room)
          orderArray.push({
            ...order,
            room: JSON.parse(JSON.stringify(orderRef.data())),
            user: order.userId,
          })
        }
      }
      unsubscribeOrders = unsubscribe
      dispatch(setOrders(JSON.parse(JSON.stringify(orderArray))))
    })
  } catch (error) {
    console.error(error)
  }
}

export const { setCurrentUser, clearCurrentUser, setOrders } = currentUserSlice.actions
export default currentUserSlice.reducer