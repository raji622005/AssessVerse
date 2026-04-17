const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { protect, adminOnly } = require("../middleware/authMiddleware");

const path = require("path");
// Check these names! Are they named differently in your middleware file?
const authMiddleware = require("../middleware/authMiddleware");

// DEBUG: Let's see if your middleware is actually loading
console.log("Middleware Check:", {
    protect: typeof authMiddleware.protect,
    adminOnly: typeof authMiddleware.adminOnly
});


// If the console.log above shows 'undefined', line 12 will crash:
router.get("/activity-logs", protect, adminOnly, adminController.getActivityLogs);
router.get("/admin-stats", protect, adminOnly, adminController.getAdminStats);
router.get("/assessments", protect, adminOnly, adminController.getAdminAssessments);
router.patch("/assessments/:id/status", protect, adminOnly, adminController.updateAssessmentStatus);
 // Files will be saved in an 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

// Branding Routes
router.get("/branding", adminController.getBranding);
router.put("/branding", protect, adminOnly, upload.single("logo"), adminController.updateBranding);
router.get("/roles", protect, adminOnly, adminController.getRolePermissions);
router.put("/roles", protect, adminOnly, adminController.updateRolePermissions);
module.exports = router;