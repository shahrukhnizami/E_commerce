
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getStorage,
         ref,          
         uploadBytes,
         getDownloadURL 
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
import { getFirestore,
          doc, 
          setDoc,
          getDoc,
          onSnapshot ,

          collection
          ,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { 
         getAuth,
         onAuthStateChanged,
         createUserWithEmailAndPassword ,
         signInWithEmailAndPassword ,
         signOut,
         
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmv0ZymFm14N0B6H1Li2s1VsPogYI9POE",
  authDomain: "my-1st-project-50518.firebaseapp.com",
  projectId: "my-1st-project-50518",
  storageBucket: "my-1st-project-50518.appspot.com",
  messagingSenderId: "999767632842",
  appId: "1:999767632842:web:8e30c38951032e1e807d33",
  measurementId: "G-ZSYCDB54QD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// console.log("Storege---->",storage);
// console.log("Database------>",db);


export{
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword ,
    db,
    doc, 
    setDoc,
    getStorage,
    ref, 
    storage,
    getDownloadURL,
    uploadBytes,
    signOut ,
    auth,
    getDoc,
    collection,
    onSnapshot ,
    
}
   


