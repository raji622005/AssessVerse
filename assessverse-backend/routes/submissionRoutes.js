const express = require("express");
const router = express.Router();
const { 
    protect, 
    instructorOnly 
} = require("../middleware/authMiddleware");
const {
    submitAssessment,
    getAllSubmissions,
    getMyHistory,
    getSubmissionById,
    updateSubmissionScore
} = require("../controllers/submissionController");
const assessmentController=require("../controllers/assessmentController")
// --- PUBLIC / GENERAL AUTH ROUTES ---

// Student: Submit a new assessment

// Student: View their own submission history

// --- INSTRUCTOR ONLY ROUTES ---
router.post("/", protect, submitAssessment);
router.get("/my-history", protect, getMyHistory);

router.get("/get-assessments", protect, assessmentController.getAllAssessments);
router.get("/all-assessments", protect, instructorOnly, assessmentController.getAllAssessments);

// Instructor: Get all submissions for evaluation (Cleaned duplicate)
router.get("/", protect, instructorOnly, getAllSubmissions);
// Instructor: Fetch a specific submission by ID
router.get("/:id", protect,  getSubmissionById);
// Instructor: Update score/grade for a submission
router.patch("/:id", protect, instructorOnly, updateSubmissionScore);
router.get("/", protect, instructorOnly, getAllSubmissions); 
router.get("/all", protect, instructorOnly, assessmentController.getAllAssessments);
module.exports = router;