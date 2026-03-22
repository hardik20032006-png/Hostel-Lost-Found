import { db } from "./firebase.js";
import { auth } from "./firebase.js";
import { collection, addDoc }
from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* ============================
   FORM ELEMENT
   ============================ */

const foundForm = document.getElementById("foundForm");

/* ============================
   FORM SUBMIT HANDLER
   ============================ */

foundForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;

  if (!user) {
    alert("Please login first");
    return;
  }

  // Collect form values
  const itemName = document.getElementById("itemName").value;
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const location = document.getElementById("location").value;
  const dateFound = document.getElementById("dateFound").value;
  const timeFound = document.getElementById("timeFound").value;
  const description = document.getElementById("description").value;
  const contact = document.getElementById("contact").value;

  try {
    await addDoc(collection(db, "foundItems"), {
      itemName,
      name,
      category,
      location,
      dateFound,
      timeFound,
      description,
      contact,

      status: "pending",
      createdAt: new Date(),

      userId: user.uid   
    });

    alert("Found item reported successfully!");
    foundForm.reset();

  } catch (error) {
    console.error(error);
    alert("Error: " + error.message);
  }
});