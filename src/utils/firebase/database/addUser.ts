import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../'

interface IUserOptions {
    email?: string | undefined | null;
    id: string;
    image?: string | null | undefined;
    name?: string | null | undefined;
    provider: string;
    type?: 'User' | 'Admin'
}

const addUser = (options: IUserOptions): Promise<void> => new Promise((resolve, reject) => {
    const { id } = options

    const userRef = doc(db, "users", id);
    getDoc(userRef)
        .then(userSnap => {
            if (userSnap.exists()) resolve()
            else {
                setDoc(
                    userRef,
                    { ...options, type: 'User' },
                    { merge: true })
                    .then(() => resolve())
                    .catch(e => reject(e))
            }
        })
        .catch(e => reject(e))
})

export default addUser