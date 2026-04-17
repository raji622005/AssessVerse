const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  answers: { type: Map, of: mongoose.Schema.Types.Mixed },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);