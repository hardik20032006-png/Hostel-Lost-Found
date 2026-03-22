import { auth } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// REGISTER
window.registerUser = function(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Registered Successfully"))
    .catch((error) => alert(error.message));
};

// LOGIN
window.loginUser = function(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login Successful");
      window.location.href = "index.html";
    })
    .catch((error) => alert(error.message));
};

// LOGOUT
window.logoutUser = function() {
  signOut(auth).then(() => {
    alert("Logged out");
    window.location.href = "login.html";
  });
};
// CHECK USER
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in:", user.email);

    // store user globally
    window.currentUser = user;

  } else {
    console.log("No user");

    // redirect if not logged in
    if (!window.location.pathname.includes("login.html")) {
      window.location.href = "login.html";
    }
  }
});