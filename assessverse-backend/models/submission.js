const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Add this line
const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  answers: [Schema.Types.Mixed],
  
  
  score: { type: Number, default: 0,required: true }, 
  status: { type: String,enum: ['Pending', 'Completed', 'Evaluated'], default: 'completed' },
  instructorFeedback: { type: String, default: "" }, // MISSING FIELD - MUST ADD THIS
  // Use timestamps: true or define createdAt specifically for your dashboard chart
  createdAt: { type: Date, default: Date.now } 
}, { timestamps: true }); // This automatically adds createdAt and updatedAt

module.exports = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);