const express = require("express");
const router = express.Router();
const { login } = require('../controllers/authControllers');
// 1. Point to your actual file: authControllers.js
const authController = require("../controllers/authControllers"); 
const { protect } = require("../middleware/authMiddleware");

// --- PUBLIC ROUTES ---
router.post("/signup", authController.register);
router.post("/login", authController.login);
// --- PROTECTED ROUTES (Requires Token) ---
router.post("/new", authController.resetPassword);
// Matches Frontend: axios.get("/api/user/profile")
router.get("/profile", protect, authController.getProfile);

// Matches Frontend: axios.put("/api/user/update")
router.put("/update", protect, authController.updateProfile);

module.exports = router;