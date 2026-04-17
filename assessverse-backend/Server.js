require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/NotificationRoutes");
const notificationStudentRoutes = require("./routes/notificationStudentRoutes");
const assessmentRoutes = require('./routes/assessmentRoutes');
// ... other middleware ...
const submissionRoutes = require("./routes/submissionRoutes"); // or whatever you named it

// Add this line with your other API routes
const app = express();

// --- 1. MIDDLEWARE (Must come before Routes) ---
app.use(cors({
  origin: "https://assessverse-frontend.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("AssessVerse API is running...");
});
// Serve static files for logos/uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- 2. ROUTE DEFINITIONS ---

// User & Auth Management
app.use("/api/auth", require("./routes/authRoutes"));      // Login/Register
app.use("/api/users", require("./routes/userRoutes"));    // User CRUD (Matches frontend /api/users)

// Admin & Platform Settings
app.use("/api/admin", require("./routes/adminRoutes"));   // Branding/Settings
app.use("/api/submissions", submissionRoutes);
// Assessments & Submissions
app.use("/api/assessments", require("./routes/assessmentRoutes"));
// Data & Dashboard Stats
// Kept both for compatibility with your existing frontend calls
app.use('/api/data', assessmentRoutes);
app.use("/api/data", require("./routes/dataRoutes"));
app.use("/api/student", require("./routes/dataRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/admin", adminRoutes);
// Role-Specific Routes
app.use("/api/instructor", require("./routes/instructorRoutes"));
app.use("/api/notifications/student", notificationStudentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/notification", notificationRoutes);

// --- 3. DATABASE CONNECTION ---
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mindfulDB";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// --- 4. SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 API endpoints ready at http://localhost:${PORT}/api`);
});