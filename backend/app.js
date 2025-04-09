require("dotenv").config(); // THIS LINE IS CRITICAL AND MUST BE AT THE VERY TOP

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MONGO_URI } = require("./config/keys");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Import Models
require("./models/User");
require("./models/Elections");

// ✅ Import Routes
app.use(require("./routes/auth"));
app.use(require("./routes/electionRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
