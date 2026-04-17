const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Current Line 13-14
console.log("--- Checking controller functions ---");
console.log("getProfile is:", typeof userController.getProfile);
console.log("updateProfile is:", typeof userController.updateProfile);
console.log("registerUser is:", typeof userController.registerUser);
console.log("getAllUsers is:", typeof userController.getAllUsers);
console.log("getUserById is:", typeof userController.getUserById);
console.log("updateUser is:", typeof userController.updateUser);
console.log("deleteUser is:", typeof userController.deleteUser);
console.log("-------------------------------------");

router.get("/profile", protect, userController.getProfile);
router.put("/profile", protect, userController.updateProfile);
/** * ADMIN ROUTES 
 * The crash is happening below because one of these functions is missing in the controller.
 */
router.post("/register", protect, adminOnly, userController.registerUser);


// This is Line 25 - Ensure getAllUsers exists in controller!
router.get("/", protect, userController.getAllUsers);
router.get("/:id", protect, adminOnly, userController.getUserById);
router.put("/:id", protect, adminOnly, userController.updateUser);
router.delete("/:id", protect, adminOnly, userController.deleteUser);

module.exports = router;