import { collection, query, onSnapshot, DocumentData, Unsubscribe, where } from "firebase/firestore";
import { db } from '..'

const listenUser = (userId: string, cb: (data: DocumentData[], unsubscribe: Unsubscribe) => void): void => {
    const q = query(collection(db, "users"), where('id', '==', userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const user: DocumentData[] = []
        querySnapshot.forEach((u) => {
            user.push({ ...u.data() })
        })
        cb(user, unsubscribe)
    })
}

export default listenUser