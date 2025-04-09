const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  aadhaar: { type: String, required: true, unique: true },
  city: String,
  state: String,
  pic: { type: String, default: "default-profile.png" },
  isAdmin: { type: Boolean, default: false },
  otp: Number,
  otpExpiry: Date, // ✅ Store OTP Expiry
});

module.exports = mongoose.model("User", userSchema);
