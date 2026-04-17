const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { getAdminStats } = require("../controllers/adminController");
// 1. Only import what you actually use
const { getStudentStats } = require("../controllers/dataControllers"); 
const { protect,adminOnly } = require("../middleware/authMiddleware");

// 2. Route for Student Dashboard Stats
// Make sure 'protect' is the middleware that populates req.user
router.get("/student-stats", protect, getStudentStats);
router.get("/admin-stats", protect, getAdminStats);
module.exports = router;