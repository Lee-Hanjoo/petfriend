import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfZauDYZ8yYbeGz8LUYbpMNvczBf92NAk",
  authDomain: "petfriend-77a67.firebaseapp.com",
  projectId: "petfriend-77a67",
  storageBucket: "petfriend-77a67.appspot.com",
  messagingSenderId: "838974498419",
  appId: "1:838974498419:web:8ec5acd9abf944a3c6ac06",
  measurementId: "G-8ZF5SRSQDB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);