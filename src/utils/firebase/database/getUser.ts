import { rejects } from "assert";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from '..'

const getUser = (userId: string): Promise<DocumentData> => new Promise((resolve, reject) => {
    const docRef = doc(db, "users", userId);
    getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                resolve(docSnap.data())
            } else {
                reject('No User found')
            }
        })
        .catch((e) => rejects(e))
})

export default getUser