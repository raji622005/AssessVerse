const Submission = require("../models/submission");
const Assessment = require("../models/Assessment");
const Notificationi = require("../models/Notificationi");
const NotificationStudent = require("../models/NotificationStudent");
// @desc    Submit an assessment and notify instructor
// @route   POST /api/submissions
// @access  Private (Student)
exports.submitAssessment = async (req, res) => {
  try {
    const { assessmentId, answers } = req.body;
    const studentId = req.user._id;
    const studentName = req.user.name;

    // 1. Validate Assessment exists
    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    // 2. Calculate Score (Example logic: comparing answers to correct answers)
    let correctCount = 0;
    assessment.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correctCount++;
      }
    });

    const totalQuestions = assessment.questions.length;
    const finalScore = Math.round((correctCount / totalQuestions) * 100);

    // 3. Create the Submission record
    const newSubmission = await Submission.create({
      userId: studentId,
      assessmentId,
      answers,
      score: finalScore,
      status: "Completed"
    });

    // 4. CREATE NOTIFICATION FOR INSTRUCTOR (Using your Notificationi model)
    await Notificationi.create({
      recipient: assessment.createdBy, // Linked to the creator of the assessment
      sender: studentId,                 // The student who submitted
      studentName: studentName,
      assessmentTitle: assessment.title,
      message: "has submitted their assessment.",
      isRead: false
    });

    res.status(201).json({
      success: true,
      data: newSubmission,
      message: "Submission successful and Instructor notified"
    });

  } catch (error) {
    console.error("Submission Error Details:", error);
    res.status(500).json({ 
      message: "Error processing submission", 
      error: error.message 
    });
  }
};

// @desc    Get all submissions (for Instructor/Admin)
// @route   GET /api/submissions
// @access  Private
// submissionController.js

// --- KEEP YOUR NEW CODE (submitAssessment, getAllSubmissions) ABOVE THIS ---

// Add these to prevent the "argument handler" crash:
exports.getAllSubmissions = async (req, res) => {
  try {
    // Populate userId to get the student's name for your table
    const submissions = await Submission.find().populate("userId", "name role");
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching submissions", error: error.message });
  }
};

exports.updateSubmissionScore = async (req, res) => {
  try {
    const { id } = req.params; // Submission ID
    const { score, status } = req.body;

    // 1. Update the submission in the database
    const submission = await Submission.findByIdAndUpdate(
      id,
      { score, status: status || "Evaluated" },
      { new: true }
    ).populate("assessmentId");

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // 2. TRIGGER STUDENT NOTIFICATION
    // This notifies the student that their specific test has been graded
    await NotificationStudent.create({
      recipient: submission.userId, // The student who owns the submission
      sender: req.user._id,         // The instructor currently evaluating it
      assessmentTitle: submission.assessmentId.title,
      message: `Your assessment has been evaluated. Score: ${score}%`
    });

    res.status(200).json({
      success: true,
      message: "Score updated and student notified",
      data: submission
    });
  } catch (error) {
    console.error("Evaluation Error:", error.message);
    res.status(500).json({ message: "Error updating score", error: error.message });
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
