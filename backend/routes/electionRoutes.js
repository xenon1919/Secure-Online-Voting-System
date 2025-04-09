const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Election = require("../models/Elections");

const router = express.Router();

/** ✅ Get All Elections (For Admin & Voters) */
router.get("/allelections", requireLogin, async (req, res) => {
  try {
    const elections = await Election.find().select(
      "_id title resultsAnnounced candidates votes"
    );

    const formattedElections = elections.map((election) => ({
      _id: election._id,
      title: election.title,
      resultsAnnounced: election.resultsAnnounced,
      candidates: election.candidates.map(
        ({ _id, name, party, symbol, votes }) => ({
          _id,
          name,
          party,
          symbol,
          votes:
            req.user?.isAdmin || election.resultsAnnounced
              ? votes.length
              : undefined,
        })
      ),
      totalVotes:
        req.user?.isAdmin || election.resultsAnnounced
          ? election.votes.length
          : undefined,
    }));

    res.status(200).json({ elections: formattedElections });
  } catch (error) {
    console.error("Error fetching elections:", error);
    res.status(500).json({ error: "Failed to fetch elections" });
  }
});

/** ✅ Create a New Election (Admin Only) */
router.post("/createelection", requireLogin, async (req, res) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: "Unauthorized: Admins only" });
  }

  const { title, candidates } = req.body;
  if (!title || !candidates?.length) {
    return res.status(422).json({ error: "All fields are required" });
  }

  try {
    const existingElection = await Election.findOne({ title });
    if (existingElection) {
      return res.status(409).json({ error: "Election already exists" });
    }

    const newElection = new Election({ title, candidates });
    await newElection.save();
    res.json({
      message: "Election created successfully",
      election: newElection,
    });
  } catch (error) {
    console.error("Error creating election:", error);
    res.status(500).json({ error: "Failed to create election" });
  }
});

/** ✅ Update Election (Admin Only) */
router.put("/updateelection/:id", requireLogin, async (req, res) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: "Unauthorized: Admins only" });
  }

  const { title, candidates } = req.body;
  try {
    const election = await Election.findByIdAndUpdate(
      req.params.id,
      { title, candidates },
      { new: true }
    );

    if (!election) {
      return res.status(404).json({ error: "Election not found" });
    }

    res.json({ message: "Election updated successfully", election });
  } catch (error) {
    console.error("Error updating election:", error);
    res.status(500).json({ error: "Failed to update election" });
  }
});

/** ✅ Delete Election (Admin Only) */
router.delete("/deleteelection/:id", requireLogin, async (req, res) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: "Unauthorized: Admins only" });
  }

  try {
    const deletedElection = await Election.findByIdAndDelete(req.params.id);
    if (!deletedElection) {
      return res.status(404).json({ error: "Election not found" });
    }

    res.json({ message: "Election deleted successfully" });
  } catch (error) {
    console.error("Error deleting election:", error);
    res.status(500).json({ error: "Failed to delete election" });
  }
});

/** ✅ Vote for a Candidate (One Vote Per Election) */
router.put("/vote", requireLogin, async (req, res) => {
  const { electionId, candidateId } = req.body;

  try {
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({ error: "Election not found" });
    }

    const userId = req.user._id;

    if (election.votes.includes(userId)) {
      return res
        .status(403)
        .json({ error: "You have already voted in this election" });
    }

    const candidate = election.candidates.id(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    candidate.votes.push(userId);
    election.votes.push(userId);

    await election.save();

    res.json({ message: "Vote cast successfully", updatedElection: election });
  } catch (error) {
    console.error("Error casting vote:", error);
    res.status(500).json({ error: "Failed to cast vote" });
  }
});

/** ✅ Admin Releases Election Results */
router.put("/releaseresults/:id", requireLogin, async (req, res) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: "Unauthorized: Admins only" });
  }

  try {
    console.log("Election ID:", req.params.id); // Debugging

    const election = await Election.findById(req.params.id);
    if (!election) {
      console.log("Election not found!");
      return res.status(404).json({ error: "Election not found" });
    }

    election.resultsAnnounced = true;
    await election.save();

    res.json({ message: "Results released successfully", election });
  } catch (error) {
    console.error("Error releasing results:", error);
    res.status(500).json({ error: "Failed to release results" });
  }
});

/** ✅ Get Election Results (Only If Announced) */
router.get("/results", requireLogin, async (req, res) => {
  try {
    const elections = await Election.find();

    const formattedResults = elections.map((election) => ({
      _id: election._id,
      title: election.title,
      resultsAnnounced: election.resultsAnnounced,
      totalVotes: election.resultsAnnounced
        ? election.votes.length
        : "Results will be announced soon",
      candidates: election.candidates.map((candidate) => ({
        _id: candidate._id,
        name: candidate.name,
        party: candidate.party,
        votes: election.resultsAnnounced
          ? candidate.votes.length
          : "Results will be announced soon",
      })),
    }));

    res.json({ elections: formattedResults });
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Failed to fetch election results" });
  }
});

module.exports = router;
