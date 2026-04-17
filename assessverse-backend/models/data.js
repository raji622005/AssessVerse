const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  content: String,
});

module.exports = mongoose.model("Data", dataSchema);