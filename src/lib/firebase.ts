import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBO-MTH_GF95IsTRe2AaPE8Ut6M7ZEsEe0",
  authDomain: "next-gen-66cdc.firebaseapp.com",
  projectId: "next-gen-66cdc",
  storageBucket: "next-gen-66cdc.firebasestorage.app",
  messagingSenderId: "921563022948",
  appId: "1:921563022948:web:f83a633efaa20bbdc88171",
  measurementId: "G-XK184C8ZNZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
