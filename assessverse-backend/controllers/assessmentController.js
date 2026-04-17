const Submission = require("../models/submission");
const Assessment =require("../models/Assessment");
const Notification = require("../models/Notification");
const User = require("../models/user");
const NotificationStudent = require("../models/NotificationStudent");
// 1. Create Assessment (Instructor Flow)
exports.createAssessment = async (req, res) => {
  try {
    const { title, description, duration, questions, status, totalMarks, tags } = req.body;
    const instructorId = req.user._id;

    const assessment = new Assessment({
      title,
      description,
      duration,
      questions,
      tags,
      totalMarks,
      status: status || "Published",
      createdBy: instructorId, 
    });

    const savedAssessment = await assessment.save();

    // --- NOTIFICATION LOGIC ---

    if (savedAssessment.status === "Published") {
      // A. Notify Admin (Existing)
      await Notification.create({
        type: "ASSESSMENT_PUBLISHED",
        message: `New Assessment: ${savedAssessment.title}`,
        details: `Instructor: ${req.user.name || "Instructor"}`,
        assessmentId: savedAssessment._id
      });

      // B. Notify All Students (New Code Added Here)
      const students = await User.find({ role: "student" });
      const studentNotifications = students.map(student => ({
        recipient: student._id,
        sender: instructorId,
        assessmentTitle: savedAssessment.title,
        message: "A new assessment has been posted!"
      }));

      if (studentNotifications.length > 0) {
        await NotificationStudent.insertMany(studentNotifications);
      }
    }

    res.status(201).json(savedAssessment);
  } catch (error) {
    console.error("Assessment Creation Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// 1. Fetch All (Now specifically for the logged-in Instructor)

exports.getAllAssessments = async (req, res) => {
  try {
    // 2. Fetch all published assessments
    const assessments = await Assessment.find({ status: "Published" });
    
    // 3. Always check if the result is valid before sending
    res.status(200).json(assessments);
  } catch (error) {
    // 4. This log will show you the EXACT error in Render Logs
    console.error("CRITICAL SERVER ERROR:", error.message); 
    res.status(500).json({ 
      success: false, 
      message: "Server encountered an error fetching assessments",
      error: error.message 
    });
  }
}// 2. Get Instructor Stats (Fixed Submissions Query)
exports.getInstructorStats = async (req, res) => {
  try {
    if (!req.user || !req.user._id) return res.status(401).json({ message: "Not authorized" });

    const instructorId = req.user._id;

    // 1. Count assessments created by instructor
    const totalCount = await Assessment.countDocuments({ createdBy: instructorId });

    // 2. Find assessments by this instructor first to get their IDs
    const instructorAssessments = await Assessment.find({ createdBy: instructorId }).select("_id");
    const assessmentIds = instructorAssessments.map(a => a._id);

    // 3. FIX: Find submissions for those specific assessments
    const submissions = await Submission.find({ assessmentId: { $in: assessmentIds } });

    const evaluatedCount = submissions.filter(s => 
      s.status && (s.status.toLowerCase() === "evaluated" || s.status.toLowerCase() === "graded")
    ).length;

    const pendingCount = submissions.filter(s => 
      s.status && (s.status.toLowerCase() === "completed" || s.status.toLowerCase() === "pending")
    ).length;

    res.json({
      total: totalCount,
      pending: pendingCount,
      evaluated: evaluatedCount
    });
  } catch (err) {
    console.error("Dashboard Stats Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 4. Get Single Assessment (Test Interface Flow)
exports.getAssessmentById = async (req, res) => {
  try {
    // .populate('createdBy', 'name') joins the User collection 
    // to include the instructor's name
    const assessment = await Assessment.findById(req.params.id)
      .populate('createdBy', 'name'); 
    
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });
    res.status(200).json(assessment);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching details." });
  }
};

// 5. Submit Assessment (Student Submission Flow)
exports. submitAssessment = async (req, res) => {
  try {
    console.log("1. Request Body received:", req.body);
    
    const newSubmission = new Submission({
      userId: req.user._id,
      assessmentId: req.body.assessmentId,
      answers: req.body.answers,
      score: req.body.score || 0
    });

    console.log("2. Attempting to save to collection:", Submission.collection.name);
    const result = await newSubmission.save();
    const assessment = await Assessment.findById(req.body.assessmentId);
    await Notification.create({
      type: "ASSESSMENT_SUBMITTED",
      message: `Assessment Submitted: ${assessment ? assessment.title : "Unknown Test"}`,
      details: `Student: ${req.user.name || "Student ID: " + req.user._id}`,
    });
    console.log("3. SAVE SUCCESSFUL! Document ID:", result._id);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("❌ SAVE FAILED:", error.message);
    res.status(500).json({ error: error.message });
  }
};
// assessmentController.js

// Add this missing function!
exports. deleteAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndDelete(req.params.id);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    res.status(200).json({ message: "Assessment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteAssessmentAndNotify = async (req, res) => {
  try {
    // 1. Find the notification first to get the linked assessmentId
    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // 2. If it has an assessmentId, delete that assessment
    if (notification.assessmentId) {
      await Assessment.findByIdAndDelete(notification.assessmentId);
    }

    // 3. Delete the notification itself
    await Notification.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Assessment and Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};