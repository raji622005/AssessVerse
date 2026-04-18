const express = require("express");
const router = express.Router();
const { protect, instructorOnly } = require("../middleware/authMiddleware");
const {
    submitAssessment,
    getAllSubmissions,
    getMyHistory,
    getSubmissionById,
    updateSubmissionScore,
    getSingleSubmission
} = require("../controllers/submissionController");
const assessmentController = require("../controllers/assessmentController");

// --- STUDENT ROUTES ---
// Submit a new assessment
router.post("/", protect, submitAssessment);
router.get("/", protect, getAllSubmissions);
// View personal history
router.get("/my-history", protect, getMyHistory);
// Student access to get assessments (if needed)
router.get("/get-assessments", protect, assessmentController.getAllAssessments);

// --- INSTRUCTOR ONLY ROUTES ---
// Get all student submissions for the evaluation table
router.get("/all-submissions", protect, instructorOnly, getAllSubmissions);
// Get all assessments for instructor management
router.get("/all-assessments", protect, instructorOnly, assessmentController.getAllAssessments);
// Fetch a specific submission by ID for detailed viewing/grading
router.get("/:id", protect, instructorOnly, getSubmissionById);
// Update score/grade for a submission
router.patch("/:id", protect, instructorOnly, updateSubmissionScore);
// Ensure it doesn't only say adminOnly
router.get("/:id", protect, getSingleSubmission);
module.exports = router;