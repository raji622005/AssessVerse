const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getProfile = async (req, res) => {
  try {
    // FIX: Use ._id (attached by protect middleware)
    const userId = req.user._id || req.user.userId; 
    const user = await User.findById(userId).select("-password");
    
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { oldPassword, newPassword, ...otherFields } = req.body;
    const userId = req.user._id || req.user.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // ONLY process password if newPassword actually has text
    if (newPassword && newPassword.trim() !== "") {
      if (!oldPassword) {
        return res.status(400).json({ message: "Old password is required to set a new one" });
      }

      // Verify the old password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

      // Hash and update the new password
      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Protect sensitive fields from being overwritten by accident
    delete otherFields._id;
    delete otherFields.email;
    delete otherFields.role;

    // Update other profile fields (name, mobile, age, etc.)
    Object.assign(user, otherFields);
    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update Error:", err.message); // This will show you the exact error in your terminal
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};



// --- SIGNUP LOGIC ---
exports.register = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, role, password: hashedPassword });
    await newUser.save(); // This stores the data in MongoDB
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};
// --- LOGIN LOGIC ---
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || "SECRET_KEY", 
      { expiresIn: "1d" }
    );

    // FIXED: Added userId to the JSON response
    res.status(200).json({ 
      token, 
      userId: user._id, // This is required for the frontend
      userName: user.name, 
      role: user.role 
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // 1. Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // 3. Save the updated user
    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error during password reset" });
  }
};

