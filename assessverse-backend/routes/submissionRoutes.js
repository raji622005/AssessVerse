const express = require("express");
const router = express.Router();
const { protect, instructorOnly } = require("../middleware/authMiddleware");
// Import Controllers
const {
    submitAssessment,
    getAllSubmissions,
    getMyHistory,
    getSubmissionById,
    updateSubmissionScore,
    // ensure this exists in your controller for manual evaluation
    evaluateSubmission 
} = require("../controllers/submissionController");
const assessmentController = require("../controllers/assessmentController");

// --- PUBLIC / SHARED ROUTES ---
// View personal history (Student)
router.get("/my-history", protect, getMyHistory);

// Student access to list available assessments
router.get("/get-assessments", protect, assessmentController.getAllAssessments);


// --- STUDENT SUBMISSION ROUTES ---
// Submit a new assessment (Score starts at 0 for manual grading)
router.post("/", protect, submitAssessment);


// --- INSTRUCTOR EVALUATION ROUTES ---
// Get all student submissions for the instructor's grading table
router.get("/all-submissions", protect, instructorOnly, getAllSubmissions);

// Get all assessments for instructor management
router.get("/all-assessments", protect, instructorOnly, assessmentController.getAllAssessments);

// The manual evaluation endpoint (PUT)
// This is used when the instructor clicks "Save Score" in the UI
router.put("/evaluate/:id", protect, instructorOnly, updateSubmissionScore);


// --- DETAIL VIEW ROUTES ---
/** * NOTE: Specific ID routes must come LAST. 
 * We use a single route that handles both Student and Instructor view logic
 * via the getSubmissionById controller function.
 */
router.get("/:id", protect, getSubmissionById);

// Patch route if you prefer partial updates for scores
router.patch("/:id", protect, instructorOnly, updateSubmissionScore);


module.exports = router;