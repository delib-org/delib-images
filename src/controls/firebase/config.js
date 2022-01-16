// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyD4ea9eyKaVqYYmA8u5oe08_akeQw2FikU",
    authDomain: "select-mass-pictures.firebaseapp.com",
    databaseURL: "https://select-mass-pictures.firebaseio.com",
    projectId: "select-mass-pictures",
    storageBucket: "select-mass-pictures.appspot.com",
    messagingSenderId: "81837724142",
    appId: "1:81837724142:web:9ae6497e1b5503b664feff",
    measurementId: "G-BG29JM3ZPQ"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics();