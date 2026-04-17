const express = require("express");
const router = express.Router();
const { getStudentNotifications, markAsRead } = require("../controllers/notificationStudentController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getStudentNotifications);
router.put("/:id/read", protect, markAsRead);

module.exports = router;