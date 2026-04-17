const express = require("express");
const router = express.Router();
const assessmentController = require("../controllers/assessmentController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const NotificationStudent = require("../models/NotificationStudent");

// ==========================================
// 1. STATIC ROUTES (Must come first)
// ==========================================

// Fetch all published assessments for the catalog
router.get("/all", assessmentController.getAllAssessments);

// Student Notifications
router.get("/student", protect, async (req, res) => {
    try {
        const notifications = await NotificationStudent.find({ 
            recipient: req.user._id, 
            isRead: false 
        });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications" });
    }
});

// Instructor/Admin stats
router.get("/instructor-stats", protect, assessmentController.getInstructorStats);
router.get("/", protect, assessmentController.getAllAssessments);
router.get("/all", assessmentController.getAllAssessments);
router.get("/:id", assessmentController.getAssessmentById);

// Instructor's own assessments (for the Manage page)
router.get("/get-assessments", protect, assessmentController.getAllAssessments);
router.get('/get-assessment/:id', assessmentController.getAssessmentById);
// ==========================================
// 2. ACTION ROUTES (POST/DELETE)
// ==========================================

router.post("/create", protect, assessmentController.createAssessment);
router.delete("/delete-assessment/:id", protect, assessmentController.deleteAssessment);

// ==========================================
// 3. DYNAMIC PARAMETER ROUTES (Must come last)
// ==========================================
// This captures any GET request with a single ID (e.g., /api/assessments/69d3f9...)

module.exports = router;