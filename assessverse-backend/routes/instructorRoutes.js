
const express = require("express");
const router = express.Router();
const Assessment = require("../models/Assessment");
const { getStudentStats } = require("../controllers/dataControllers"); // Import your controller
const authMiddleware = require("../middleware/authMiddleware");
const { protect } = require("../middleware/authMiddleware");
console.log("Instructor Route Check:", {
  protect: typeof protect,
  getStudentStats: typeof getStudentStats
});
router.get("/student-stats", protect, getStudentStats);
// Path: GET /api/data/instructor-stats
router.get("/instructor-stats", async (req, res) => {
  try {
    const total = await Assessment.countDocuments();
    // Setting defaults for pending/evaluated as requested in your dashboard logic
    res.json({ total, pending: 0, evaluated: 0 });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

// Path: GET /api/data/get-assessments
router.get("/get-assessments", async (req, res) => {
  try {
    const assessments = await Assessment.find().sort({ createdAt: -1 });
    res.json(assessments);
  } catch (err) { 
    res.status(500).json({ error: "Failed to fetch assessments" }); 
  }
});
router.get("/get-assessment/:id", async (req, res) => {
  const assessment = await Assessment.findById(req.params.id);
  res.json(assessment);
});
router.put("/update-assessment/:id", async (req, res) => {
  const updated = await Assessment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
// Path: DELETE /api/data/delete-assessment/:id
router.delete("/delete-assessment/:id", async (req, res) => {
  try {
    await Assessment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assessment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

module.exports = router;