import { collection, query, where, onSnapshot, DocumentData, Unsubscribe, getDoc } from "firebase/firestore";
import { db } from '..'

const listenAllClassrooms = (cb: (data: DocumentData[], unsubscribe: Unsubscribe) => void): void => {
    const q = query(collection(db, "classrooms"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const classrooms: DocumentData[] = []
        querySnapshot.forEach((room) => {
            classrooms.push({ ...room.data(), id: room.id })
        })
        cb(classrooms, unsubscribe)
    })
}

export default listenAllClassrooms