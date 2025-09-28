import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "GOOGLE_API_KEY",
  authDomain: "last-supper-28252.firebaseapp.com",
  projectId: "last-supper-28252",
  storageBucket: "last-supper-28252.firebasestorage.app",
  messagingSenderId: "365052867226",
  appId: "1:365052867226:web:f92f870ed25f8168d8a523",
  measurementId: "G-FZXDQKJG64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;
