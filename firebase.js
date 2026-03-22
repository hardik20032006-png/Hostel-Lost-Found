// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyBs7wY7xIAkegd3R2u1s0GKquDh-KkNdbs",
  authDomain: "hostel-lost-and-found-a6d10.firebaseapp.com",
  projectId: "hostel-lost-and-found-a6d10",
  storageBucket: "hostel-lost-and-found-a6d10.firebasestorage.app",
  messagingSenderId: "358815053249",
  appId: "1:358815053249:web:0d9b9648c944e5c03eeb40"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
