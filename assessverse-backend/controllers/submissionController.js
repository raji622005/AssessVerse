const Submission = require("../models/submission");
const Assessment = require("../models/Assessment");
const Notificationi = require("../models/Notificationi");
const NotificationStudent = require("../models/NotificationStudent");
// @desc    Submit an assessment and notify instructor
// @route   POST /api/submissions
// @access  Private (Student)

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
    const finalScore = score !== undefined ? score : 0;

    // 3. Create the Submission record
    const newSubmission = await Submission.create({
      userId: studentId,
      assessmentId,
      answers, // This will correctly save your Map data
      score: finalScore,
      status: "Completed"
    });

    // 4. NOTIFICATION LOGIC (Remains same)
    await Notificationi.create({
      recipient: assessment.createdBy,
      sender: studentId,
      studentName: studentName,
      assessmentTitle: assessment.title,
      message: "has submitted their assessment.",
      isRead: false
    });

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
// @desc    Get all submissions (for Instructor/Admin)
// @route   GET /api/submissions
// @access  Private
// submissionController.js

// --- KEEP YOUR NEW CODE (submitAssessment, getAllSubmissions) ABOVE THIS ---

// Add these to prevent the "argument handler" crash:
// Backend Controller (submissionsController.js)
exports. getAllSubmissions = async (req, res) => {

  try {

    const submissions = await Submission.find()

      .populate('assessmentId', 'title') // This replaces the ID with the actual assessment document

      .populate('userId', 'name')        // This replaces the ID with the student's name

      .exec();



    res.status(200).json(submissions);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};
exports.updateSubmissionScore = async (req, res) => {
  try {
    const { id } = req.params; // Submission ID
    // Added instructorFeedback to the destructured body
    const { score, instructorFeedback, status } = req.body;
    const submission = await Submission.findByIdAndUpdate(
      id,
      { 
        score: Number(score), 
        instructorFeedback: instructorFeedback || "", 
        status: status || "Graded" 
      },
      { new: true }
    ).populate("assessmentId");

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    const assessmentTitle = submission.assessmentId?.title || "Assessment";
    
    await NotificationStudent.create({
      recipient: submission.userId, // The student who owns the submission
      sender: req.user._id,         // The instructor evaluating it
      assessmentTitle: assessmentTitle,
      message: `Your evaluation for "${assessmentTitle}" is complete. Final Score: ${score}`
    });

    res.status(200).json({
      success: true,
      message: "Score updated and student notified",
      data: submission
    });
  } catch (error) {
    console.error("Evaluation Error:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Error updating score", 
      error: error.message 
    });
  }
};
exports.getMyHistory = async (req, res) => {
    try {
        const history = await Submission.find({ userId: req.user._id }).populate("assessmentId", "title").sort({ createdAt: -1 });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// submissionController.js
exports.getSubmissionById = async (req, res) => {
    try {
        // Find the submission and 'join' it with the assessment document
        const submission = await Submission.findById(req.params.id)
            .populate({
                path: "assessmentId",
                select: "title instructorName" // Select exactly the fields you need
            });

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }
        res.status(200).json(submission);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Error fetching combined data" });
    }
};

// controllers/submissionController.js
exports.getSingleSubmission = async (req, res) => {
  try {
    // .populate('assessmentId') allows you to see the Assessment Title on the frontend
    const submission = await Submission.findById(req.params.id).populate('assessmentId');

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Convert both to strings to ensure the comparison works
    const isOwner = submission.studentId.toString() === req.user.id.toString();
    const isAdmin = req.user.role.toLowerCase() === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to view this report" });
    }

    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
