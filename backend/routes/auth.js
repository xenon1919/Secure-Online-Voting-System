const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const axios = require("axios");
const { JWT_SECRET } = require("../config/keys");
require("dotenv").config();
const requireLogin = require("../middleware/requireLogin");
const { encryptData, decryptData } = require("../utils/encryption");

const router = express.Router();
const User = mongoose.model("User");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

router.post("/signup", async (req, res) => {
  const { name, email, password, aadhaar, city, state, pic } = req.body;

  if (!name || !email || !password || !aadhaar || !city || !state) {
    return res.status(422).json({ error: "Please fill all fields" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { aadhaar }] });
    if (existingUser) {
      return res.status(422).json({ error: "Email or Aadhaar already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const encryptedAadhaar = encryptData(aadhaar);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      aadhaar: encryptedAadhaar,
      city,
      state,
      pic,
      isAdmin: false,
    });

    await user.save();
    res.json({ message: "Registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password, recaptchaToken } = req.body;

  if (!email || !password || !recaptchaToken) {
    return res.status(422).json({ error: "Please provide all fields" });
  }

  try {
    const captchaRes = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`
    );

    if (!captchaRes.data.success) {
      return res.status(400).json({ error: "reCAPTCHA verification failed" });
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ email, isAdmin: true }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.json({
        message: "Admin login successful",
        token,
        user: { name: "Election Admin", email, isAdmin: true },
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({ error: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(422).json({ error: "Invalid email or password" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    console.log(`📩 Sending OTP ${otp} to ${email}`);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Secure Login",
      text: `Your OTP for login is: ${otp}. It expires in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ OTP Email Sent Successfully!");

    const decryptedAadhaar = decryptData(user.aadhaar);

    res.json({
      message: "OTP sent to your email",
      userId: user._id,
      user: {
        ...user.toObject(),
        aadhaar: decryptedAadhaar,
      },
    });
  } catch (err) {
    console.error("❌ Error sending OTP:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) return res.status(422).json({ error: "OTP required" });

  try {
    const user = await User.findById(userId);
    if (!user || user.otp !== parseInt(otp) || Date.now() > user.otpExpiry) {
      return res.status(401).json({ error: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const decryptedAadhaar = decryptData(user.aadhaar);

    res.json({
      message: "Login successful",
      token,
      user: {
        ...user.toObject(),
        aadhaar: decryptedAadhaar,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
