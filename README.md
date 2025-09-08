# React Login & Sign-Up App

A modern and responsive React application for Login and Sign-Up functionality. Built using **React**, **Vite**, **React Hook Form**, **Tailwind CSS**, and **ShadCN** components. The app demonstrates reusable forms, input validation, and client-side routing.

---

## 🔗 Live Demo

[https://react-login-signup-app-pi.vercel.app/](https://react-login-signup-app-pi.vercel.app/)

## 📂 Repository

[https://github.com/yash-189/react-login-signup-app](https://github.com/yash-189/react-login-signup-app)

---

## 🏗 Project Structure

auth-pages/
├─ src/
│ ├─ components/
│ │ ├─ forms/
│ │ │ └─ ConfigurableForm.jsx
│ │ └─ layout/
│ │ └─ AuthLayout.jsx
│ ├─ pages/
│ │ ├─ auth/
│ │ │ ├─ login/
│ │ │ │ └─ LoginPage.jsx
│ │ │ └─ register/
│ │ │ └─ RegisterPage.jsx
│ ├─ App.jsx
│ └─ main.jsx
├─ package.json
├─ tailwind.config.js
└─ vite.config.js

yaml
Copy code

---

## ⚡ Features

- **Reusable Form Component** with configurable fields
- **Input Validation**:
  - Name: Alphabets only
  - Username: Alphanumeric + special characters
  - Password: Must include uppercase, lowercase, number, special character, and cannot match username
  - Confirm Password: Must match password
  - Email: Valid email format
  - Phone: Country code + number only
- **Password Visibility Toggle**
- **Responsive Design**
- **Client-Side Routing** between Login & Sign-Up
- **Modern UI** using ShadCN components and Tailwind CSS

---

## 🛠 Technologies Used

- React 18
- Vite
- Tailwind CSS
- ShadCN UI Components
- React Hook Form
- Lucide Icons
- React Router DOM

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yash-189/react-login-signup-app.git
cd react-login-signup-app
2. Install dependencies
bash
Copy code
npm install
3. Run the development server
bash
Copy code
npm run dev
Open http://localhost:5173 to view the app.

🔒 Form Validation
The forms in this project are powered by React Hook Form. Validation rules include:

Minimum and maximum character lengths

Regular expression checks for format

Custom validation for passwords and confirm passwords

Error messages appear below input fields if validation fails.

📌 Notes
The project currently demonstrates frontend functionality only.

Navigation after login or sign-up is handled client-side.

Backend integration can be added for full authentication flow.
