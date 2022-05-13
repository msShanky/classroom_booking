import { doc, DocumentData, DocumentReference, setDoc } from "firebase/firestore";
import { db } from '../'

interface BookingOptions {
    roomId: string;
    userId: any;
    room?: DocumentReference<DocumentData>;
    user?: DocumentReference<DocumentData>;
    slot: string;
    bookingDate: Date;
    bookedOn?: Date;
    cancelled?: boolean;
}

const bookClassroom = (options: BookingOptions): Promise<void> => new Promise((resolve, reject) => {

    const { roomId, userId, bookingDate } = options

    const bookingDetails: BookingOptions = {
        ...options,
        bookingDate: new Date(bookingDate.setHours(0, 0, 0, 0)),
        bookedOn: new Date(),
        cancelled: false,
        user: doc(db, 'users/' + userId),
        room: doc(db, 'classrooms/' + roomId)
    }

    setDoc(
        doc(db, "bookings", `${roomId}--${userId}--${Date.now()}`),
        bookingDetails,
    ).then(() => resolve()).catch((e) => reject(e))
})

export default bookClassroom