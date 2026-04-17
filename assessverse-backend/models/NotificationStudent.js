const mongoose = require("mongoose");

const notificationStudentSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // The Instructor
  assessmentTitle: { type: String, required: true },
  message: { type: String, required: true }, // e.g., "New Assessment Available" or "Result Evaluated"
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("NotificationStudent", notificationStudentSchema);