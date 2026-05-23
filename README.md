# 🎓 University Management System

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge" />
</p>

<p align="center">
  A full-stack University Management System built with the MERN stack for managing students, professors, administrators, courses, and academic operations.
</p>

---

## 📌 Overview

The **University Management System** is a role-based web application designed to streamline university operations. It provides separate dashboards for **Admin**, **Professor**, and **Student** users.

This project demonstrates practical experience with:

- MERN Stack Development
- JWT Authentication & Authorization
- RESTful API Development
- File Upload Handling
- Role-Based Access Control
- Responsive UI Design
- Deployment with Vercel and Render

---

## ✨ Features

### 👨‍💼 Admin Module
- Secure Admin Login
- Manage Students and Professors
- Add, Update, and Delete Courses
- Assign Professors to Courses
- Monitor Academic Data

### 👨‍🏫 Professor Module
- Professor Authentication
- View Assigned Courses
- Upload Notes and Study Materials
- Manage Student Attendance
- Enter Marks and Results

### 👨‍🎓 Student Module
- Student Registration and Login
- View Enrolled Courses
- Check Attendance Records
- View Marks and Results
- Download Uploaded Materials

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=mongodb,express,react,nodejs,vite,tailwind,git,github,vscode,vercel" />
  <img src="https://go-skill-icons.vercel.app/api/icons?i=render" height="48" alt="Render" />
  <img src="https://go-skill-icons.vercel.app/api/icons?i=mongodbatlas" height="48" alt="MongoDB Atlas" />
</p>

---

## 📂 Project Structure

```text
University-Management-System/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vercel.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── uploads/
│   ├── package.json
│   ├── package-lock.json
│   ├── seed.js
│   ├── seedData.js
│   └── server.js
│
├── .gitignore
└── README.md
```

---

## 🗄️ Core Modules

- Authentication & Authorization
- Student Management
- Professor Management
- Course Management
- Attendance Tracking
- Marks & Results Management
- Study Material Upload
- Dashboard Analytics

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/vatsalgajera-tech/University-Management-System.git
cd University-Management-System
```

### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 3️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file inside the `backend/` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### 5️⃣ Seed Demo Data (Optional)

```bash
cd backend
node seed.js
```

### 6️⃣ Run Backend Server

```bash
npm run dev
```

### 7️⃣ Run Frontend

```bash
cd ../frontend
npm run dev
```

### 8️⃣ Open in Browser

```text
http://localhost:5173
```

---

## 🔐 User Roles

| Role | Access |
|------|--------|
| Admin | Manage users(Professor, Students), courses, subjects, notices, leaves |
| Professor | Manage materials, leaves, attendance and view students and notices |
| Student | View courses, attendance, materials, profile, leaves, notices |

---

## 🚀 Future Enhancements

- Fee Management System
- Timetable Generator
- Notifications & Email Alerts
- Video Lecture Integration
- AI-Based Performance Analytics

---

## 🧠 Key Learnings

Through this project, I gained hands-on experience with:

- Full-Stack MERN Development
- JWT Authentication
- Protected Routes
- REST API Design
- MongoDB Schema Modeling
- File Uploads with Multer
- Deployment Workflows

---

## 👨‍💻 Author

### Vatsal Gajera

- GitHub: https://github.com/vatsalgajera-tech
- LinkedIn: https://www.linkedin.com/in/vatsalgajera/
- Email: vatsalgajera.tech@gmail.com

---


## 📜 License

This project is developed for educational and portfolio purposes.
