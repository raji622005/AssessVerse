// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.startsWith("Bearer") 
      ? req.headers.authorization.split(" ")[1] 
      : null;

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");

    // Must match the key used in Step 1
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // This makes req.user._id available in all controllers
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'instructor')) {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Staff only" });
  }
};
const instructorOnly = (req, res, next) => {
  // Check if req.user exists AND if the role is 'instructor'
  if (req.user && (req.user.role === "instructor" || req.user.role === "admin")) {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Instructors only" });
  }
};
module.exports = { protect,adminOnly,instructorOnly };