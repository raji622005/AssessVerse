const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/NotificationController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Get all notifications
router.get("/", protect, notificationController.getNotifications);

router.get("/instructor", protect, notificationController.getInstructorNotifications);
// Mark as read (Delete)
router.delete("/:id", protect, notificationController.deleteNotification);

// Delete assessment and notification
router.delete("/assessment/:id", protect, adminOnly, notificationController.deleteAssessmentAndNotify);
module.exports = router;