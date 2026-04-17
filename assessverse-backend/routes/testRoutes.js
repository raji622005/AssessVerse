const express = require("express");
const router = express.Router();

const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

// ================= ADMIN ONLY =================
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.send("Welcome Admin");
});

// ================= INSTRUCTOR ONLY =================
router.get("/instructor", verifyToken, authorizeRoles("instructor"), (req, res) => {
  res.send("Welcome Instructor");
});

// ================= STUDENT ONLY =================
router.get("/student", verifyToken, authorizeRoles("student"), (req, res) => {
  res.send("Welcome Student");
});

module.exports = router;