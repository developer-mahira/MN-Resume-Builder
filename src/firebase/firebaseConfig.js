import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
// Replace these values with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyDJhQf6lx5wHVt4rfUG19BFWkCAwmDJy1M",
  authDomain: "mn-resume-builder.firebaseapp.com",
  projectId: "mn-resume-builder",
  storageBucket: "mn-resume-builder.firebasestorage.app",
  messagingSenderId: "796423107366",
  appId: "1:796423107366:web:1990398e577ca38a1a87e7",
  measurementId: "G-2G1HSYELX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

