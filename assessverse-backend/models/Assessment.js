const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ["MCQ", "SHORT", "LONG"] },
  question: { type: String, required: true },
  choices: [String], 
  correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true }, 
  marks: { type: Number, default: 1 }
});

const assessmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true },
  questions: [questionSchema], // Structured questions are critical!
  totalMarks: { type: Number, default: 0 },
  status: { type: String, default: "Published" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema);