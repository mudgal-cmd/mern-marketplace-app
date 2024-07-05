// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-react-app-417f4.firebaseapp.com",
  projectId: "mern-react-app-417f4",
  storageBucket: "mern-react-app-417f4.appspot.com",
  messagingSenderId: "554857891516",
  appId: "1:554857891516:web:af6c5b527836ece6ff32b9",
  measurementId: "G-2HW2Z8DYV3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);