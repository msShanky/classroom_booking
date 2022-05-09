import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUser, updateClassroomLike, updateUser } from '../../utils/firebase/database';
import { AppDispatch } from '../store';

interface UserState {
  bookmarks: string[],
  email: string,
  id: string,
  image: string,
  name: string,
  provider: string,
  likes: string[]
}

interface UpdateArrayOptions {
  type: 'bookmarks' | 'likes';
  value: string;
  action: 'remove' | 'add';
}

const initialState = {
  bookmarks: [],
  email: '',
  id: '',
  image: '',
  name: '',
  provider: '',
  likes: []
} as UserState

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => state = payload,
    clearCurrentUser: (state) => state = initialState,
    updateArrayField: (state, action: PayloadAction<{ type: 'bookmarks' | 'likes'; value: string[] }>) => {
      const { type, value } = action.payload
      state = { ...state, [type]: value }
      return state
    },
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

      let array: string[] = []

      if (action === 'add') array = [...currentUser[type], value]
      else array = currentUser[type].filter((v: string) => v !== value)

      await updateUser({ id: currentUser?.id, [type]: array })
      if (type === 'likes') await updateClassroomLike({ id: value, value: action === 'add' ? 1 : -1 })
      dispatch(updateArrayField({ type, value: array }))
      if (type === 'likes') likeQueue = likeQueue.filter(v => v !== value)
    } catch (error) {
      console.error(error)
    }
  }
})()

export const fetchUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const user = await getUser(id)
    dispatch(setCurrentUser(user))
  } catch (error) {
    console.error(error)
  }
}

export const { setCurrentUser, clearCurrentUser, updateArrayField } = currentUserSlice.actions
export default currentUserSlice.reducer