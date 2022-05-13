import { doc, setDoc } from "firebase/firestore";
import { db } from '..'

interface UpdateUserOptions {
    id: string;
    image?: string | null | undefined;
    name?: string | null | undefined;
    likes?: string[];
    bookmarks?: string[];
}

const updateUser = (options: UpdateUserOptions): Promise<void> => new Promise((resolve, reject) => {
    const { id } = options

    setDoc(
        doc(db, "users", id),
        { ...options },
        { merge: true })
        .then(() => resolve())
        .catch(e => reject(e))
})

export default updateUser