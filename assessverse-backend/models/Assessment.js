const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true },
  questions: { type: Array, default: [] },
  tags: [String],
  totalMarks: { type: Number },
  status: { type: String, default: "Published" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// CRITICAL FIX: Ensure the name is 'Assessment', not 'Submission'
module.exports = mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema);