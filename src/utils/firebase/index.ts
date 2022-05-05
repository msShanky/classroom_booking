// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCALJ8eY4RwpJLIfckqPdVjg-6xyeGv89o",
  authDomain: "classroom-booking-b6c79.firebaseapp.com",
  projectId: "classroom-booking-b6c79",
  storageBucket: "classroom-booking-b6c79.appspot.com",
  messagingSenderId: "347469440046",
  appId: "1:347469440046:web:b56dfb38321f8cbbeb6bbf",
  measurementId: "G-RQLSR85T8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;