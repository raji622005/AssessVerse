const mongoose = require("mongoose");

const notificationiSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // The Instructor who will see this
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // The Student who submitted
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  assessmentTitle: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: "submitted an assessment",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Notificationi", notificationiSchema);
