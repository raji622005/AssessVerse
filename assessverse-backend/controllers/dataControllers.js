// controllers/dataControllers.js
const Submission = require("../models/submission");
const mongoose = require("mongoose");

exports.getStudentStats = async (req, res) => {
  try {
    // If we got here, req.user is guaranteed by Step 2
    const uId = new mongoose.Types.ObjectId(req.user._id);

    const stats = await Submission.aggregate([
      { $match: { userId: uId } },
      { $group: { _id: null, total: { $sum: 1 }, avg: { $avg: "$score" } } }
    ]);

    res.json({
      totalTaken: stats[0]?.total || 0,
      averageScore: Math.round(stats[0]?.avg || 0)
    });
  } catch (error) {
    console.error("Stats Error:", error.message);
    res.status(500).json({ message: "Database Error" });
  }
};