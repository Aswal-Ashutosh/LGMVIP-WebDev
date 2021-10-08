import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseConfig } from "../services/secret";

// INITIALIZATIONS
const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export const firestore = getFirestore(firebaseApp);

//FIREBASE AUTHENTICATION RELATED FUNCTIONS
export const signIn = async function (email, password) {
  await signInWithEmailAndPassword(firebaseAuth, email, password).catch((e) => {
    throw e;
  });
};

export const signUp = async function (email, password) {
  await createUserWithEmailAndPassword(firebaseAuth, email, password).catch(
    (e) => {
      throw e;
    }
  );
};

//FIRESTORE RELATED DATA AND FUNCTIONS

const availableIdRef = doc(firestore, "available-id", "id-number");

//Function to register new college
const getCollegeID = async function () {
  try {
    const docSnap = await getDoc(availableIdRef);
    const collegeID = docSnap.data().id;
    await updateDoc(availableIdRef, { id: collegeID + 1 });
    return collegeID;
  } catch (e) {
    alert("Error: incrementAvailableId");
  }
};

export const registerCollege = async function (adminEmail, college) {
  try {
    //Generate unique id for college
    const collegeID = await getCollegeID();

    //Add admin's email to admin collection
    const adminRef = doc(firestore, "admin", adminEmail);
    await setDoc(adminRef, { "alloted-college-id": collegeID });

    //Add collegeId to college collection
    const collegeRef = doc(firestore, "college", collegeID.toString());
    await setDoc(collegeRef, { "college-name": college });
  } catch (e) {
    alert("Error: registerCollege");
  }
};
