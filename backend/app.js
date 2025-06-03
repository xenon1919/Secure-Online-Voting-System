require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MONGO_URI } = require("./config/keys");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

require("./models/User");
require("./models/Elections");

app.use(require("./routes/auth"));
app.use(require("./routes/electionRoutes"));

app.get("/", (req, res) => {
  res.send("Server is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
