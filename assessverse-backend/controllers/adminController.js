const Assessment = require("../models/Assessment");
const User = require("../models/user"); // Ensure this matches your file name (User vs user)
const Submission = require("../models/submission");
const Branding = require("../models/Branding");
const Role = require("../models/Role");

// Fetch ALL assessments for the Admin Oversight Table
exports.getAdminAssessments = async (req, res) => {
  try {
    // .populate('createdBy', 'name') lets us see the instructor's name
    const assessments = await Assessment.find().populate('createdBy', 'name');
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all assessments" });
  }
};

// Handle the Flag/Restore button logic
exports.updateAssessmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const assessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

// 1. Fetch Dashboard Stats
exports.getAdminStats = async (req, res) => {
  try {
    // Count Users by Role for the Dashboard Cards
    const students = await User.countDocuments({ role: "student" });
    const instructors = await User.countDocuments({ role: "instructor" });
    
    // Detailed Assessment counts for the Assessments card
    const totalAssessments = await Assessment.countDocuments();
    const published = await Assessment.countDocuments({ status: "Published" });
    const draft = await Assessment.countDocuments({ status: "Draft" });

    res.status(200).json({
      students: { total: students, active: students },
      instructors: { total: instructors, active: instructors },
      assessments: { 
        total: totalAssessments, 
        ready: published, 
        pending: draft 
      }
    });
  } catch (err) {
    console.error("Stats Fetch Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// 2. Fetch All Assessments for the Oversight Table
exports.getAdminAssessments = async (req, res) => {
  try {
    // .populate replaces the 'createdBy' ID with the actual User document 'name'
    const assessments = await Assessment.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
      
    res.status(200).json(assessments);
  } catch (err) {
    console.error("Assessment Fetch Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// 3. Toggle Flag/Restore Action
exports.updateAssessmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updated = await Assessment.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    
    res.status(200).json(updated);
  } catch (err) {
    console.error("Status Update Error:", err);
    res.status(500).json({ message: "Status update failed" });
  }
};
exports.getActivityLogs = async (req, res) => {
  try {
    // 1. Fetch Student Submissions 
    const studentActivities = await Submission.find()
      // CHANGED: Your screenshot shows 'userId', not 'studentId'
      .populate("userId", "name")     
      .populate("assessmentId", "title") 
      .lean() || [];

    // 2. Fetch Instructor Assessments
    const instructorActivities = await Assessment.find()
      .populate("createdBy", "name")    
      .lean() || [];

    // 3. Format Student Data safely
    const studentLogs = studentActivities.map(s => ({
      _id: s._id,
      date: s.createdAt || new Date(), 
      // CHANGED: Match the populated 'userId' field
      name: s.userId?.name || "Unknown Student",
      role: "Student",
      action: "Submitted Test",
      // Match your screenshot status (e.g., "evaluated") or default to "Success"
      status: s.status === "evaluated" ? "Success" : (s.status || "Pending"), 
      details: s.assessmentId?.title || "General Assessment"
    }));

    // 4. Format Instructor Data safely
    const instructorLogs = instructorActivities.map(i => ({
      _id: i._id,
      date: i.createdAt || new Date(),
      name: i.createdBy?.name || "Unknown Instructor",
      role: "Instructor",
      action: "Created Test",
      status: i.status === "Published" ? "Success" : "Failed",
      details: i.title || "Untitled Test"
    }));

    // Combine and sort by date (newest first)
    const combinedLogs = [...studentLogs, ...instructorLogs].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );

    res.status(200).json(combinedLogs);

  } catch (error) {
    console.error("CRITICAL ERROR in getActivityLogs:", error.message);
    res.status(500).json({ 
      message: "Server failed to process logs", 
      error: error.message 
    });
  }
};

// GET Branding Settings
exports.getBranding = async (req, res) => {
  try {
    let branding = await Branding.findOne();
    if (!branding) {
      branding = await Branding.create({ name: "AssessVerse" });
    }
    res.status(200).json(branding);
  } catch (err) {
    res.status(500).json({ message: "Error fetching branding" });
  }
};

// UPDATE Branding Settings
exports.updateBranding = async (req, res) => {
  try {
    const { name } = req.body;
    let updateData = { name };

    if (req.file) {
      // Store the path where the file was saved
      updateData.logoUrl = `/uploads/${req.file.filename}`;
    }

    const branding = await Branding.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
    });

    res.status(200).json(branding);
  } catch (err) {
    res.status(500).json({ message: "Error updating branding" });
  }
};
exports.getRolePermissions = async (req, res) => {
  try {
    let roles = await Role.findOne();
    if (!roles) roles = await Role.create({});
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching roles" });
  }
};

exports.updateRolePermissions = async (req, res) => {
  try {
    const { permissions } = req.body;
    const roles = await Role.findOneAndUpdate({}, { permissions }, { new: true, upsert: true });
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: "Error updating roles" });
  }
};