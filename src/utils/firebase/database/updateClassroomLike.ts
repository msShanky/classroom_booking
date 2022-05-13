import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from '..'

interface UpdateClassroomLikeOptions {
    id: string;
    value: number;
}

const updateClassroomLike = (function () {
    let likeQueue: string[] = []
    return (options: UpdateClassroomLikeOptions): Promise<void> => new Promise((resolve, reject) => {
        try {
            const { id, value } = options
            if (likeQueue.includes(id)) {
                resolve()
                return
            }
            else {
                likeQueue.push(id)
                const ref = doc(db, "classrooms", id)
                updateDoc(ref, { likeCount: increment(value) }).then(() => {
                    likeQueue = likeQueue.filter(d => d !== id);
                    resolve()
                })
            }
        } catch (error) {
            reject(error)
        }
    })
})()

export default updateClassroomLike