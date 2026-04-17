const express = require("express");
const router = express.Router();
const Submission = require("../models/submission"); // Ensure this path is correct

// 1. Changed "/submissions" to "/" to fix the double-naming 404 (e.g., /api/submissions/)
router.post("/", async (req, res) => {
  try {
    const { userId, assessmentId, answers } = req.body;
    
    const newSubmission = new Submission({
      userId,
      assessmentId,
      answers
    });

    await newSubmission.save();
    res.status(201).json({ message: "Submission saved!" });
  } catch (err) {
    console.error("Error saving submission:", err);
    res.status(500).json({ error: err.message });
  }
});

// ROUTES/SUBMISSION.JS
router.get("/", async (req, res) => {
  try {
    // This pulls the full document for both the student and the assessment
    const submissions = await Submission.find()
      .populate("userId", "name") // Assuming your User model has a 'name' field
      .populate("assessmentId", "title"); // Assuming Assessment has a 'title' field
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// 2. ADD THIS: This fixes the 404 error for "my-history" seen in your screenshot
router.get("/my-history", async (req, res) => {
  try {
    // This fetches all submissions. You can later filter by userId if needed.
    const history = await Submission.find().populate("assessmentId"); 
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;