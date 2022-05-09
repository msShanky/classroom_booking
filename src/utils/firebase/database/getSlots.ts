import { collection, query, where, onSnapshot, DocumentData, Unsubscribe, getDoc } from "firebase/firestore";
import { db } from '..'

interface SlotOptions {
    roomId: string;
    bookingDate: Date;
}

const listenSlots = (options: SlotOptions, cb: (data: DocumentData[], unsubscribe: Unsubscribe) => void): void => {
    const { roomId, bookingDate } = options
    const q = query(
        collection(db, "bookings"),
        where("roomId", "==", roomId),
        where("bookingDate", "==", new Date(bookingDate.setHours(0, 0, 0, 0))),
        where("cancelled", "==", true)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const bookings: DocumentData[] = []
        querySnapshot.forEach((room) => {
            bookings.push({ ...room.data(), id: room.id })
        })
        cb(bookings, unsubscribe)
    })
}

export default listenSlots