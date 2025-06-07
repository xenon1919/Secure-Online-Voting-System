
# 🗳️ Secure Online Voting System

A secure, scalable online voting application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The system supports user registration, vote casting, election result viewing, and strong security measures like JWT authentication, OTP verification, and rate-limiting.

---

## 📌 Features

- 🔐 **Secure Authentication** (JWT, OTP)
- 🧑‍🤝‍🧑 Voter and Admin Roles
- 🗳️ Vote Casting with One-Vote Restriction
- 👥 Candidate Management (Admin)
- 📊 Election Result Display
- 📬 Email Notifications for OTP
- ⚙️ Protected APIs with Security Middleware
- 🧪 Unit, Integration, Acceptance, and Security Tests

---

## 🧱 Tech Stack

**Frontend**:
- React.js
- Tailwind CSS / Bootstrap (Optional)
- Axios

**Backend**:
- Node.js
- Express.js
- MongoDB (with Mongoose)

**Security & Utilities**:
- JWT
- Bcrypt
- Nodemailer
---



## 🛠️ Installation & Setup

### Prerequisites:
- Node.js
- MongoDB
- Nodemailer email credentials

### 1. Clone the repo:
```bash
git clone https://github.com/xenon1919/Secure-Online-Voting-System.git
cd Secure-Online-Voting-System
```

### 2. Backend Setup:
```bash
cd backend
npm install
```

Add a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=youremail@example.com
EMAIL_PASS=yourpassword
```

Start backend:
```bash
npm start
```

### 3. Frontend Setup:
```bash
cd ../client
npm install
npm start
```

---

## 🔒 Security Measures

- **JWT Authentication** with expiration
- **Bcrypt** for password hashing
- **OTP Verification** for email
- **Rate Limiting** to prevent brute-force attacks
- **Input Validation & Sanitization**
- **Security Testing**:
  - JWT tampering
  - SQL/NoSQL injection simulation
  - Spam protection

---

## 🧪 Testing Strategy

- **Unit Tests**: Utilities and functions (`*.test.js`)
- **Integration Tests**: Route and API flow tests
- **Acceptance Tests**: Complete user flow (registration, login, vote)
- **Security Tests**: JWT tampering, rate limit, injection attacks

Run tests:
```bash
cd backend
npm test
```

---

## 🚀 Future Enhancements

- 📱 Progressive Web App (PWA) Support
- 🧾 Blockchain Integration for immutable vote records
- 📅 Multi-election support with deadlines
- 🌐 Internationalization (i18n)

---

## 🙌 Contributors

- **Ramanchi Rishi Sai Teja** – Developer & Maintainer

---

## 📃 License

This project is licensed under the MIT License.
