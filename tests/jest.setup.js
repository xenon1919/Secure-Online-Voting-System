const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({}, { strict: false });
mongoose.model("User", userSchema);
