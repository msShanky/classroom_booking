import { doc, setDoc } from "firebase/firestore";
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

    setDoc(
        doc(db, "users", id),
        { ...options, type: 'User' },
        { merge: true })
        .then(() => resolve())
        .catch(e => reject(e))
})

export default addUser