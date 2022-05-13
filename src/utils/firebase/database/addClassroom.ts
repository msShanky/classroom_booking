import { doc, DocumentData, DocumentReference, setDoc } from "firebase/firestore";
import { db } from '../'

interface ClassRoomOptions {
    roomName: string;
    imageURL: any;
    tags: string[];
    startDate: Date | null;
    closeDate: Date | null;
    authorId: any;
    author: DocumentReference<DocumentData>;
    created?: Date;
    likeCount?: number;
    isActive: boolean
}

const addClassRoom = (options: ClassRoomOptions): Promise<void> => new Promise((resolve, reject) => {

    const { startDate, closeDate, authorId } = options

    const classroomDetails: ClassRoomOptions = {
        ...options,
        author: doc(db, 'users/' + authorId),
        created: new Date(),
        startDate: startDate ? new Date(startDate.setHours(0, 0, 0, 0)) : new Date((new Date()).setHours(0, 0, 0, 0)),
        closeDate: closeDate ? new Date(closeDate.setHours(0, 0, 0, 0)) : null,
        likeCount: 0,
        isActive: true
    }

    setDoc(
        doc(db, "classrooms", `${authorId}---${Date.now()}`),
        classroomDetails,
    ).then(() => resolve()).catch((e) => reject(e))
})

export default addClassRoom