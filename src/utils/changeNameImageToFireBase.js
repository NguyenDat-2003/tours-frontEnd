import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import app from '~/components/firebaseUpload'

const changeNameImageToFireBase = async (file, foldersName) => {
  if (file.name) {
    const storage = getStorage(app)
    const storageRef = ref(storage, `${foldersName}/${Date.now()}-${file.name}`)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  }
}

export default changeNameImageToFireBase
