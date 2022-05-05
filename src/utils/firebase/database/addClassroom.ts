import { doc, setDoc } from "firebase/firestore";
import { db } from '../'

interface IClassRoomOptions {
    roomName: string;
    imageURL: any;
    tags: string[];
    startDate: Date | null;
    closeDate: Date | null;
    authorId: any;
    created?: Date;
    likeCount?: number;
}

const addClassRoom = (options: IClassRoomOptions): Promise<void> => new Promise((resolve, reject) => {

    const { startDate, closeDate, authorId } = options

    const classroomDetails: IClassRoomOptions = {
        ...options,
        created: new Date(),
        startDate: startDate ? new Date(startDate.setHours(0, 0, 0, 0)) : new Date((new Date()).setHours(0, 0, 0, 0)),
        closeDate: closeDate ? new Date(closeDate.setHours(0, 0, 0, 0)) : null,
        likeCount: 0
    }

    setDoc(
        doc(db, "classrooms", `${authorId}---${Date.now()}`),
        classroomDetails,
    ).then(() => resolve()).catch((e) => reject(e))
})

export default addClassRoom