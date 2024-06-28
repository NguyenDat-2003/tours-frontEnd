import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB2fbC59EQGG61Xt3UeOGhMEhvqge2A5fk',
  authDomain: 'tours-app-firebase-images.firebaseapp.com',
  projectId: 'tours-app-firebase-images',
  storageBucket: 'tours-app-firebase-images.appspot.com',
  messagingSenderId: '144341465794',
  appId: '1:144341465794:web:1234b68703bc541553595b'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export default app
