// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7DC2gOsuVEsbMLS-B2-2Juk28L_Sihqw",
  authDomain: "expense-tracker-874ca.firebaseapp.com",
  projectId: "expense-tracker-874ca",
  storageBucket: "expense-tracker-874ca.appspot.com",
  messagingSenderId: "886965362755",
  appId: "1:886965362755:web:3b707eced1bb599f6834f6",
  measurementId: "G-YZCXBG8SDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)