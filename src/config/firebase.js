import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP8r4a1SQKfM5uTdoHlb5jYmz6X_Hlvpw",
  authDomain: "andritetin-wedding.firebaseapp.com",
  projectId: "andritetin-wedding",
  storageBucket: "andritetin-wedding.firebasestorage.app",
  messagingSenderId: "83126122302",
  appId: "1:83126122302:web:73ad6c15534b62b7afde6f",
  measurementId: "G-6L17QRGY5G"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const initAuth = async () => {
  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.error("AUTH ERROR:", error.code, error.message);
  }
};
