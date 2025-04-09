const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const router = express.Router();
const Post = mongoose.model("Post");
const User = mongoose.model("User");

// **🔹 Cast Vote (PUT /vote)**
router.put("/vote", requireLogin, async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id;

    if (!postId) {
      return res.status(422).json({ error: "Post ID is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // **🔸 Prevent multiple votes**
    if (post.votes.includes(userId)) {
      return res.status(400).json({ error: "You have already voted" });
    }

    // **🔸 Add vote**
    post.votes.push(userId);
    await post.save();

    res.json({ message: "Vote cast successfully", post });
  } catch (error) {
    console.error("Vote Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// **🔹 Get All Candidates (GET /allpost)**
router.get("/allpost", async (req, res) => {
  try {
    const posts = await Post.find().populate("votes", "_id name");
    res.json({ posts });
  } catch (error) {
    console.error("Fetch Candidates Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// **🔹 Get Election Results (GET /results)**
router.get("/results", async (req, res) => {
  try {
    const results = await Post.find()
      .sort({ "votes.length": -1 })
      .select("title votes");

    if (!results.length) {
      return res.status(404).json({ error: "No results available" });
    }

    res.json({ results });
  } catch (error) {
    console.error("Fetch Results Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
