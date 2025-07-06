// firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCDCF5pk2ho7VXwe434Fi300odqNoTaz1Q",
  authDomain: "skylensai.firebaseapp.com",
  projectId: "skylensai",
  storageBucket: "skylensai.firebasestorage.app",
  messagingSenderId: "826820471758",
  appId: "1:826820471758:web:5091c4350d1eb02770599f",
  measurementId: "G-Z1RGH3G4EC"
};

// ✅ Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Export Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
