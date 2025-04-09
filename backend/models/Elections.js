const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String, required: true },
  symbol: { type: String, required: true },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  candidates: [candidateSchema],
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  resultsAnnounced: { type: Boolean, default: false }, // ✅ Added field
});

const Election = mongoose.model("Election", electionSchema);
module.exports = Election;
