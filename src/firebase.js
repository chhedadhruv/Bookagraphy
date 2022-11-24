// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgfm2O9wXJFe6C62PAvY9YOEBj4roue2U",
  authDomain: "bookagraphy-e4950.firebaseapp.com",
  projectId: "bookagraphy-e4950",
  storageBucket: "bookagraphy-e4950.appspot.com",
  messagingSenderId: "492449757043",
  appId: "1:492449757043:web:4628a119f29e79764b7706",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
