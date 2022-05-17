import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDoc, Unsubscribe } from 'firebase/firestore';
import { listenAllClassrooms } from '../../utils/firebase/database';
import { AppDispatch } from '../store';

export interface ClassroomState {
  imageURL: string;
  roomName: string;
  tags: string[];
  authorId: string;
  likeCount: number;
  created: { seconds: number };
  id: string;
  isActive: boolean
}

const initialState = [] as ClassroomState[]

let unsubscribeClassroom: Unsubscribe | null = null

const classroomsSlice = createSlice({
  name: 'classrooms',
  initialState,
  reducers: {
    setClassrooms: (state, { payload }) => state = payload,
    clearClassrooms: (state) => state = initialState,
    updateClassroom: (state, action: PayloadAction<{ type: 'bookmarks' | 'likes'; value: string[] }>) => {
      const { type, value } = action.payload
      state = { ...state, [type]: value }
      return state
    },
  },
})

export const fetchClassrooms = () => async (dispatch: AppDispatch) => {
  try {
    if (unsubscribeClassroom) { unsubscribeClassroom() }
    listenAllClassrooms(async (classrooms, unsubscribe) => {
      for (let i = 0; i < classrooms.length; i++) {
        let classroom = classrooms[i];
        if (classroom.author) {
          const authorRef = await getDoc(classroom.author)
          classroom.author = JSON.parse(JSON.stringify(authorRef.data()))
        }
      }
      unsubscribeClassroom = unsubscribe
      dispatch(setClassrooms(JSON.parse(JSON.stringify(classrooms))))
    });
  } catch (error) {
    console.error(error)
  }
}

export const { setClassrooms, clearClassrooms, updateClassroom } = classroomsSlice.actions
export default classroomsSlice.reducer