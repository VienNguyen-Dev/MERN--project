// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estase-5dd5d.firebaseapp.com",
  projectId: "estase-5dd5d",
  storageBucket: "estase-5dd5d.appspot.com",
  messagingSenderId: "390835346461",
  appId: "1:390835346461:web:81bb1e3abf451dbb273af4",
  measurementId: "G-C5KF5RGK2S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);