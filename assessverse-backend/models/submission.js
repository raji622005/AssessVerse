const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  answers: { type: Map, of: mongoose.Schema.Types.Mixed },
  
  
  score: { type: Number, default: 0 }, 
  status: { type: String, default: 'completed' },
  // Use timestamps: true or define createdAt specifically for your dashboard chart
  createdAt: { type: Date, default: Date.now } 
}, { timestamps: true }); // This automatically adds createdAt and updatedAt

module.exports = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);