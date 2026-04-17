const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  permissions: {
    Student: { type: String, default: "View, Attempt Tests" },
    Instructor: { type: String, default: "Create, Evaluate Tests" },
    Admin: { type: String, default: "Full Access" }
  }
});
module.exports = mongoose.model("Role", roleSchema);