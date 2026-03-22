# 🏠 Hostel Lost & Found

A simple and practical web application designed to help students report, find, and recover lost items inside a hostel environment in an organized way.

---

---

## 📌 Problem Statement

In hostels, items are frequently lost, but there is no structured system to:
- Report lost items
- Share found items
- Connect the right people quickly

This project solves that problem by providing a centralized digital platform.

---

## 💡 Features

- 🔐 **User Authentication**
  - Email-based login using Firebase Authentication
  - Persistent login session
  - Protected pages (cannot access without login)

- 📦 **Lost & Found Management**
  - Report lost items
  - Report found items
  - Separate listing pages for both

- ⚡ **Real-Time Updates**
  - Powered by Firebase Firestore
  - Items appear instantly without page reload

- 🎯 **Filtering System**
  - Filter by category
  - Filter by status (Pending / Completed)
  - Filter by date

- 👤 **Owner-Based Controls**
  - Only the creator of a post can:
    - Mark item as completed
    - Delete the item
  - Other users can only view and contact

- 📞 **Contact Integration**
  - One-click WhatsApp redirection
  - Direct communication between users

---

## 🧠 How It Works

### 🧾 Lost Item Flow
1. User checks the Found Items list  
2. If item is found → contact the finder  
3. If not → report lost item  

### 🔍 Found Item Flow
1. User checks the Lost Items list  
2. If match found → contact the owner  
3. If not → report found item  

### 🔄 Completion Flow
- After resolving:
  - Owner marks item as **Completed**
  - Option to delete the item

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, Vanilla JavaScript  
- **Backend:** Firebase Firestore  
- **Authentication:** Firebase Auth  
- **Hosting:** GitHub Pages  

---

## 🔐 Security Logic

Each item stored in Firestore includes:

```js
userId: user.uid


Learning Outcomes

Through this project, I learned:

Real-time database handling with Firebase
Authentication and session management
Building dynamic UI without frameworks
Structuring a multi-page web application
Adding features without breaking existing functionality


