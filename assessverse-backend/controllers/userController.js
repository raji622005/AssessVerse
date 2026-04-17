const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Notification = require("../models/Notification");
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const { oldPassword, newPassword, ...otherFields } = req.body;
    const userId = req.user?._id; // Middleware provides this

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Password Update Logic
    if (newPassword && newPassword.trim() !== "") {
      if (!oldPassword) return res.status(400).json({ message: "Old password required" });
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: "Current password incorrect" });
      
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // Update other fields
    const allowedUpdates = ['name', 'mobile', 'age', 'gender', 'dob', 'qualification'];
    allowedUpdates.forEach(field => {
      if (otherFields[field] !== undefined) user[field] = otherFields[field];
    });

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error during update" });
  }
};
// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    // req.user is populated by the 'protect' middleware
    const user = await User.findById(req.user._id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Profile Controller Error:", error.message);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Optional: Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};
// Ensure path to your User model is correct

// DELETE User by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Deletes the document from the 'users' collection in MongoDB
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted from database successfully" });
  } catch (err) {
    console.error("Database Delete Error:", err);
    res.status(500).json({ message: "Server error during deletion" });
  }
};


exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "student", // default to student if not provided
      status: status || "Active"
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        message: "User created successfully"
      });
    }
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during user creation" });
  }
};
// Fetch single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching users" });
  }
};
