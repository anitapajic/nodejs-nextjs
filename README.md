# Contact App with Next.js and Express.js

This repository contains a **Next.js frontend** and an **Express.js backend**, designed to work together seamlessly for contacts application.

## 🚀 Project Setup

### Prerequisites
- **Node.js** (>= 18.x recommended)
- **npm** 
- **MongoDB** 

---

## 📂 Project Structure
```
/contacts-app
│   README.md
|
├── express-project  # Express API
│   ├── config/
│   ├── controllers/
│   ├── helpers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── constants.js
│   ├── server.js
│   └── .env
│
├── nextjs-project  # Next.js App
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── contacts/
│   │   │   │   ├── addContact/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── content.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   ├── components/
│   │   ├── helpers/
│   │   ├── models/
│   │   ├── services/
│   └── .env
```

---

## ⚡ Express-project (backend)

### 🛠 Installation
```sh
cd express-project
npm install
```

### ⚙ Configuration
Create a `.env` file inside the `express-project/` folder:
```env
PORT=5001
CONNECTION_STRING=mongodb://localhost:27017/your_database_name
ACCESS_TOKEN_SECRET=your_secret_key
```

### ▶ Running the Backend
```sh
npm start  # or nodemon server.js
```
The API will run at `http://localhost:5001`

---

## 🌐 Nextjs-project (frontend)

### 🛠 Installation
```sh
cd nextjs-project
npm install
```

### ⚙ Configuration
Create a `.env` file inside the `nextjs-project/` folder:
```env
NEXT_PUBLIC_DOMAIN=http://localhost:5001/api
```

### ▶ Running the Frontend
```sh
npm run dev
```
The frontend will run at `http://localhost:3000`

---

## 🔗 Connecting nextjs-project and express-project
Ensure the nextjs-project makes API calls to `NEXT_PUBLIC_DOMAIN` defined in `.env`. Example API request in Next.js:
```javascript
const fetchData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/some-endpoint`);
  const data = await response.json();
  console.log(data);
};
```

---

## 📬 Contact
For inquiries, reach out to **anitaapajic@gmail.com**.
