const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ["REGISTRATION", "ASSESSMENT_PUBLISHED", "ASSESSMENT_SUBMITTED"], 
    required: true 
  },
  message: { type: String, required: true },
  details: { type: String }, // e.g., "Instructor: Ravi Kumar" or "Student ID: #1023"
  assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }, // Link to delete assessment if needed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);