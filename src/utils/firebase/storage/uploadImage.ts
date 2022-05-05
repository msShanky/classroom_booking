import { getDownloadURL, ref, StorageError, uploadBytesResumable, UploadTaskSnapshot } from "firebase/storage";
import { storage } from '../'

interface IImageOptions {
    image: Uint8Array | null;
    type: string;
    name: string;
    cbProgress?: (snapshot: UploadTaskSnapshot) => void;
    cbError?: (e: StorageError) => void;
    cbSuccess?: () => void;
}

const uploadImage = (options: IImageOptions) => new Promise((resolve, reject) => {
    const { image, type, name, cbProgress, cbError, cbSuccess } = options
    if (image) {
        const metadata = { contentType: type };
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, image, metadata);
        uploadTask.on('state_changed',
            (snapshot) => cbProgress && cbProgress(snapshot),
            (error) => {
                cbError && cbError(error)
                reject(`Error Uploading Image - ${error.code}`)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    cbSuccess && cbSuccess()
                    resolve(downloadURL)
                });
            }
        )
    }
    else {
        reject('Error uploading Image')
    }
})

export default uploadImage