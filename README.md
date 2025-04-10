
# Secure Online Voting System

A secure, user-friendly, and transparent online voting platform for **government elections in India**, built using **React.js**, **Node.js**, **Express.js**, and **MongoDB**.

The platform ensures robust authentication using **OTP-based verification** and **Google reCAPTCHA**, and provides a modern UI/UX with **dark mode**, **real-time results**, and an **admin panel** to manage elections effectively.

---

## 🚀 Features

### Voter
- User registration with Aadhaar, email, password, and profile image
- Secure login using email and password
- **Multi-factor authentication with OTP sent to registered email**
- **Google reCAPTCHA** to prevent bots
- View active elections and vote once per election
- **Auto logout after successful voting**
- Thank-you message with motivational quote
- View **real-time election results** with winner highlight
- Responsive UI with **dark mode toggle**

### Admin
- Secure admin login with fixed credentials
- Create, update, and delete elections and candidates
- View all elections and their current vote counts
- Admin-only visibility of total votes

---

## 🛠️ Tech Stack

| Layer       | Technologies                                   |
|-------------|------------------------------------------------|
| Frontend    | React.js, Bootstrap 5, Materialize, FontAwesome, SweetAlert |
| Backend     | Node.js, Express.js, MongoDB, Mongoose         |
| Auth        | JWT, Bcrypt.js, OTP (Nodemailer), Google reCAPTCHA v2 | 

---

## ⚙️ Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
npm start
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a file `backend/config/keys.js` with the following:

```js
module.exports = {
  MONGO_URI: "your_mongodb_connection_string",
  JWT_SECRET: "your_jwt_secret",
  EMAIL: "your_gmail_address",
  EMAIL_PASS: "your_gmail_app_password",
  RECAPTCHA_SECRET: "your_recaptcha_secret_key"
};
```

Also, add your **Google reCAPTCHA site key** in the frontend `SignIn.jsx`.

---

## 🔑 Admin Credentials

```txt
Email: admin@voting.com
Password: admin123
```

---

## 🧪 Demo Flow

1. Voter signs in with email and password.
2. reCAPTCHA validation is performed.
3. OTP is sent to the voter's email.
4. User is redirected to enter OTP.
5. On successful OTP verification:
   - Voter enters the portal
   - Can view and cast vote (once per election)
   - Is logged out automatically after voting

---



## ❤️ Credits

Developed with passion by **Ramanchi Rishi Sai Teja**  
Final Year CSE - Matrusri Engineering College  
GitHub: [@xenon1919](https://github.com/xenon1919)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
