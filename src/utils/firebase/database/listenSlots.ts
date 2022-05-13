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
        where("cancelled", "==", false)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const bookings: DocumentData[] = []
        querySnapshot.forEach((booking) => {
            bookings.push({ ...booking.data() })
        })
        cb(bookings, unsubscribe)
    })
}

export default listenSlots