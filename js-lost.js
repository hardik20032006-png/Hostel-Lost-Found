import { db } from "./firebase.js";
import { auth } from "./firebase.js";
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";


/* ============================
   FORM ELEMENT
   ============================ */

const lostForm = document.getElementById("lostForm");


/* ============================
   FORM SUBMIT HANDLER
   ============================ */

lostForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;

if (!user) {
  alert("Please login first");
  return;
}

  // Collect form values
  const itemName = document.getElementById("itemName").value;
  const category = document.getElementById("category").value;
  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const dateLost = document.getElementById("dateLost").value;
  const timeLost = document.getElementById("timeLost").value;
  const description = document.getElementById("description").value;
  const contact = document.getElementById("contact").value;

  try {
    // Save lost item to Firestore
    await addDoc(collection(db, "lostItems"), {
      itemName: itemName,
      category: category,
      name: name,
      location: location,
      dateLost: dateLost,
      timeLost: timeLost,
      description: description,
      contact: contact,

      // Core item status
      status: "pending",

      createdAt: new Date(),
      userId: user.uid 
    });

    alert("Lost item reported successfully!");
    lostForm.reset();

  } catch (error) {
    console.error("Error adding lost item:", error);
    alert("Error: " + error.message);
  }
});
