import { collection, query, where, onSnapshot, DocumentData, Unsubscribe, getDoc } from "firebase/firestore";
import { db } from '..'

const listenOrders = (userId: string, cb: (data: DocumentData[], unsubscribe: Unsubscribe) => void): void => {
    const q = query(
        collection(db, "bookings"),
        where("userId", "==", userId),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const orders: DocumentData[] = []
        querySnapshot.forEach((order) => {
            orders.push({ ...order.data(), id: order.id })
        })
        cb(orders, unsubscribe)
    })
}

export default listenOrders