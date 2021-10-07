import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaoess__c4q-VWE_xx-X_vK7q4I1RCs0U",
  authDomain: "result-management-system-442e4.firebaseapp.com",
  projectId: "result-management-system-442e4",
  storageBucket: "result-management-system-442e4.appspot.com",
  messagingSenderId: "851697863963",
  appId: "1:851697863963:web:ffde3c69ea0c7651e757be",
  measurementId: "G-9EK05TKWNG"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const signUp = createUserWithEmailAndPassword;

export const signIn = signInWithEmailAndPassword;

export const firebaseAuth = getAuth(firebaseApp);

export default firebaseApp;
