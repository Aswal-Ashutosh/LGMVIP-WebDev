import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, addDoc, setDoc, updateDoc } from 'firebase/firestore'

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

export const firestore = getFirestore(firebaseApp);



//HELPING DATA AND FUNCTIONS
const availableIdRef = doc(firestore, 'available-id', 'id-number');

//Function to register new college
const getCollegeID = async function (){
  try{
    const docSnap = await getDoc(availableIdRef);
    const collegeID = docSnap.data().id;
    await updateDoc(availableIdRef, {'id': collegeID + 1});
    return collegeID;
  }catch(e){
    alert('Error: incrementAvailableId')
  }
}


export const registerCollege = async function (adminEmail, college){
  try{
    //Generate unique id for college
    const collegeID = await getCollegeID();

    //Add admin's email to admin collection
    const adminRef = doc(firestore, 'admin', adminEmail);
    await setDoc(adminRef, {'alloted-college-id': collegeID});

    //Add collegeId to college collection
    const collegeRef = doc(firestore, 'college', collegeID.toString())
    await setDoc(collegeRef, {'college-name': college});
  }catch(e){
    alert("Error: registerCollege");
  }
}

export default firebaseApp;
