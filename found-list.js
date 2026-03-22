import { db, auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* ============================
   GLOBAL USER
   ============================ */

let currentUser = null;

/* ============================
   DOM ELEMENTS
   ============================ */

const container = document.getElementById("foundItemsContainer");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const dateFilter = document.getElementById("dateFilter");
const applyBtn = document.getElementById("btn");
const resetBtn = document.getElementById("resetBtn");

/* ============================
   EMPTY STATE MESSAGE
   ============================ */

const emptyMessage = document.createElement("div");
emptyMessage.textContent = "No found items found.";
emptyMessage.style.textAlign = "center";
emptyMessage.style.marginTop = "80px";
emptyMessage.style.fontSize = "22px";
emptyMessage.style.color = "#6b7280";
emptyMessage.style.display = "none";

container.parentNode.insertBefore(emptyMessage, container);

/* ============================
   SNAPSHOT CACHE
   ============================ */

let allDocs = [];

/* ============================
   AUTH + FIRESTORE LISTENER
   ============================ */

onAuthStateChanged(auth, (user) => {
  currentUser = user;

  onSnapshot(collection(db, "foundItems"), (snapshot) => {
    allDocs = snapshot.docs;
    applyFilters(currentUser);
  });
});

/* ============================
   APPLY FILTERS
   ============================ */

function applyFilters(user) {
  const cat = categoryFilter.value;
  const status = statusFilter.value;
  const date = dateFilter.value;

  const filteredDocs = allDocs.filter((docSnap) => {
    const d = docSnap.data();

    if (cat !== "all" && d.category !== cat) return false;
    if (status !== "all" && d.status !== status) return false;
    if (date && d.dateFound !== date) return false;

    return true;
  });

  renderCards(filteredDocs, user);
}

/* ============================
   RENDER CARDS
   ============================ */

function renderCards(docs, user) {
  container.innerHTML = "";

  if (docs.length === 0) {
    emptyMessage.style.display = "block";
    container.style.display = "none";
    return;
  }

  emptyMessage.style.display = "none";
  container.style.display = "grid";

  docs.forEach((docSnap) => {
    const data = docSnap.data();
    const docId = docSnap.id;

    const card = document.createElement("div");
    card.className = "item-card";

    card.innerHTML = `
      <div class="card-image">
        <img src="${data.imageUrl || "placeholder.jpg"}">
      </div>

      <h3>${data.itemName}</h3>

      <div class="card-details">
        <p><strong>Finder name:</strong> ${data.name || "N/A"}</p>
        <p><strong>Category:</strong> ${data.category}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Date:</strong> ${data.dateFound}</p>
        <p><strong>Time:</strong> ${data.timeFound}</p>
        <p><strong>Description:</strong> ${data.description || "N/A"}</p>
        <p><strong>Status:</strong> ${data.status}</p>
      </div>

      <div class="card-actions"></div>
    `;

    const actions = card.querySelector(".card-actions");

    /* CONTACT BUTTON */

    const contactBtn = document.createElement("button");
    contactBtn.textContent = "Contact";
    contactBtn.className = "contact-btn";

    contactBtn.onclick = () => {
      const phone = data.contact?.replace(/\D/g, "");
      if (phone) {
        window.open(`https://wa.me/${phone}`, "_blank");
      }
    };

    actions.appendChild(contactBtn);

    /* OWNER BUTTON */

    if (user && data.userId === user.uid) {
      const btn = document.createElement("button");
      btn.className = "complete-btn";

      if (data.status === "pending") {
        btn.textContent = "Mark as Completed";
        btn.onclick = async () => {
          await updateDoc(doc(db, "foundItems", docId), {
            status: "completed"
          });
        };
      } else {
        contactBtn.remove();
        btn.textContent = "Delete";
        btn.onclick = async () => {
          const ok = confirm("Delete this item?");
          if (!ok) return;

          await deleteDoc(doc(db, "foundItems", docId));
        };
      }

      card.appendChild(btn);
    }

    container.appendChild(card);
  });
}

/* ============================
   FILTER BUTTONS
   ============================ */

applyBtn.onclick = () => applyFilters(currentUser);

resetBtn.onclick = () => {
  categoryFilter.value = "all";
  statusFilter.value = "all";
  dateFilter.value = "";
  applyFilters(currentUser);
};