````md id="a7m2k9"
# 📚 BookStore Application

A full-stack BookStore application built using the MERN stack.  
This project allows users to browse books, manage carts, place orders, authenticate users, manage categories, and perform admin operations.

---

# 🚀 Tech Stack

## Frontend
- React.js
- Vite
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Zod Validation
- JWT Authentication

---

# 📂 Project Structure

```bash
BOOKSTORE/
│
├── be/                     # Backend
│   ├── src/
│   │   ├── casl/
│   │   ├── common/
│   │   ├── config/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   ├── Auth/
│   │   │   ├── Users/
│   │   │   ├── Books/
│   │   │   ├── Categories/
│   │   │   ├── Orders/
│   │   │   ├── Reviews/
│   │   │   ├── Roles/
│   │   │   ├── Permissions/
│   │   │   └── Carts/
│   │   │
│   │   ├── utils/
│   │   ├── app.js
│   │   └── index.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── fe/                     # Frontend
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
│
└── README.md
````

---

# ⚙️ Backend Setup

## 1️⃣ Navigate to Backend

```bash
cd be
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Create `.env` File

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 4️⃣ Run Backend Server

```bash
npm run dev
```

Backend will start on:

```bash
http://localhost:5000
```

---

# 💻 Frontend Setup

## 1️⃣ Navigate to Frontend

```bash
cd fe
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Create `.env` File

Create a `.env` file inside the frontend folder.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 4️⃣ Run Frontend

```bash
npm run dev
```

Frontend will start on:

```bash
http://localhost:5173
```

---

# 🔐 Features

* User Authentication
* JWT Authorization
* Role Based Access
* Book Management
* Category Management
* Cart Functionality
* Order Management
* Review System
* Zod Validation
* MongoDB Database Integration
* REST APIs

---

# 📘 API Base URL

```bash
http://localhost:5000/api
```

---

# 🛠️ Available Scripts

## Backend

```bash
npm run dev
npm start
```

## Frontend

```bash
npm run dev
npm run build
```

---

# 📦 Environment Variables

## Backend `.env`

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

## Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 👨‍💻 Author

Developed by Sarthak Joshi

