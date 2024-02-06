
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
  // apiKey: "AIzaSyAAj1UJh-QQBLgPLD1NKNbPqaMar3HJoF4",
  // authDomain: "test-b3c19.firebaseapp.com",
  // projectId: "test-b3c19",
  // storageBucket: "test-b3c19.appspot.com",
  // messagingSenderId: "759561256564",
  // appId: "1:759561256564:web:2db5d6a7b36e28318bdb21"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth()