import { collection, query, getDocs, DocumentData } from "firebase/firestore";
import { db } from '..'


const getAllClassrooms = (): Promise<DocumentData[]> => new Promise((resolve, reject) => {
    const q = query(collection(db, "classrooms"));
    getDocs(q)
        .then((querySnapshot) => {
            const classrooms: DocumentData[] = []
            querySnapshot.forEach(room => classrooms.push(room.data()))
            console.log(classrooms)
            resolve(classrooms)
        })
        .catch(e => reject(e))
})

export default getAllClassrooms