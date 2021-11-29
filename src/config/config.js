import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCr5wA91cI_USgNCURtQASOfinblroswv4",
  authDomain: "mymoney-4f90a.firebaseapp.com",
  projectId: "mymoney-4f90a",
  storageBucket: "mymoney-4f90a.appspot.com",
  messagingSenderId: "27340734184",
  appId: "1:27340734184:web:a6781994fa202bf170135d",
};

// Init firebase
firebase.initializeApp(firebaseConfig);

// Init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// Timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
