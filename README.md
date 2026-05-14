# 🎓 University Management System

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-8.x-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge" />
</p>

<p align="center">
  A full-stack University Management System built with the MERN stack for managing students, professors, administrators, courses, and academic operations.
</p>

---

## 📌 Overview

The **University Management System** is a comprehensive web application that digitizes university operations. It provides dedicated dashboards for administrators, professors, and students to manage academic workflows efficiently.

This project demonstrates practical experience with:
- Full-stack MERN development
- Role-based authentication and authorization
- RESTful API design
- State management with Redux Toolkit
- Responsive UI with Tailwind CSS
- Secure JWT authentication

---

## ✨ Features

### 👨‍💼 Admin Module
- Admin Authentication
- Manage Students, Professors, and Courses
- Assign Professors to Courses
- Monitor System Activity
- View Dashboard Analytics

### 👨‍🏫 Professor Module
- Professor Login
- View Assigned Courses
- Upload Study Materials
- Manage Attendance
- Enter Student Marks

### 👨‍🎓 Student Module
- Student Registration and Login
- View Enrolled Courses
- Check Attendance
- View Marks and Results
- Download Study Materials

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=mongodb,express,react,nodejs,tailwind,redux,git,github,vscode" />
</p>

---

## 📂 Project Structure

```text
University-Management-System/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── screenshots/
├── .env.example
├── package.json
└── README.md
```

---

## 🗄️ Core Modules

- User Authentication
- Student Management
- Professor Management
- Course Management
- Attendance Management
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

### 2️⃣ Install Dependencies

#### Root
```bash
npm install
```

#### Client
```bash
cd client
npm install
```

#### Server
```bash
cd ../server
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### 4️⃣ Run the Application

#### Start Backend
```bash
npm run server
```

#### Start Frontend
```bash
npm run client
```

#### Or Run Both
```bash
npm run dev
```

### 5️⃣ Open in Browser

```text
http://localhost:5173
```

---

## 🔐 User Roles

| Role | Permissions |
|------|-------------|
| Admin | Full access to users, courses, and analytics |
| Professor | Manage attendance, marks, and materials |
| Student | View courses, attendance, results, and resources |

---

## 🚀 Future Enhancements

- Online Fee Payment
- Notifications and Email Alerts
- Timetable Management
- Video Lecture Integration
- AI-Based Performance Analytics

---

## 🧠 Key Learnings

Through this project, I gained hands-on experience with:

- MERN Stack Architecture
- JWT Authentication
- Protected Routes
- Redux Toolkit State Management
- REST API Development
- MongoDB Schema Design
- Deployment Workflows

---

## 👨‍💻 Author

### Vatsal Gajera

- GitHub: https://github.com/vatsalgajera-tech
- LinkedIn: https://www.linkedin.com/in/vatsalgajera/
- Email: vatsalgajera.tech@gmail.com

---

## ⭐ Show Your Support

If you found this project useful, please give it a ⭐ on GitHub.

---

## 📜 License

This project is developed for educational and portfolio purposes.
