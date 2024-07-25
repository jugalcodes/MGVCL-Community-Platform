// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c35de.firebaseapp.com",
  projectId: "mern-blog-c35de",
  storageBucket: "mern-blog-c35de.appspot.com",
  messagingSenderId: "394912077524",
  appId: "1:394912077524:web:20edafde371e2580420d41",
  measurementId: "G-X503EX1Z2K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);