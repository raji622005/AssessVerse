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
    // 1. Log to server console to verify the request reached here
    console.log("Fetching assessments for user:", req.user?._id);

    // 2. Fetch assessments with 'Published' status (Match Compass screenshot)
    const assessments = await Assessment.find({ status: "Published" });

    // 3. Send successful response
    return res.status(200).json(assessments);
  } catch (error) {
    // 4. Detailed error logging for Render Logs
    console.error("GET_ASSESSMENTS_ERROR:", error.message);
    
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
};
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

exports.submitAssessment = async (req, res) => {
  try {
    // 1. EXTRACT SCORE FROM REQ.BODY
    // We add 'score' here so the backend actually uses the value sent by React
    const { assessmentId, answers, score } = req.body; 
    const studentId = req.user._id;
    const studentName = req.user.name;

    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    // 2. USE THE PROVIDED SCORE OR FALLBACK TO 0
    // We remove the old loop that was crashing/failing
    const finalScore = score !== undefined ? Number(score) : 0;

    // 3. Create the Submission record
    const newSubmission = await Submission.create({
      userId: studentId,
      assessmentId,
      answers, // This will correctly save your Map data
      score: finalScore,
      status: "Completed"
    });

    // 4. NOTIFICATION LOGIC (Remains same)
    if (typeof Notificationi !== 'undefined'){
    await Notificationi.create({
      recipient: assessment.createdBy,
      sender: studentId,
      studentName: studentName,
      assessmentTitle: assessment.title,
      message: "has submitted their assessment.",
      isRead: false
    });
  }
    res.status(201).json({
      success: true,
      data: newSubmission,
      message: "Submission successful"
    });

  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({ message: "Error processing submission", error: error.message });
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
exports.updateAssessment = async (req, res) => {
  try {
    console.log("Saving Total Marks:", req.body.totalMarks);
    const { title, description, duration, questions, totalMarks, status } = req.body;

    const updatedAssessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        description, 
        duration, 
        questions,
        totalMarks, 
        status 
      },
      { new: true, runValidators: true } // runValidators ensures the new data follows schema rules
    );

    if (!updatedAssessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    res.status(200).json(updatedAssessment);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};