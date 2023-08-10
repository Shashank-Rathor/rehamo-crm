
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjOwhODigl-lhyjfEdQl9sHf654Rv5RbE",
  authDomain: "rehamo-crm.firebaseapp.com",
  projectId: "rehamo-crm",
  storageBucket: "rehamo-crm.appspot.com",
  messagingSenderId: "485261307967",
  appId: "1:485261307967:web:e4514a2707a9f12bdac88a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth()