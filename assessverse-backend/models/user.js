const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }, // Student, Instructor, or Admin
  mobile: { type: String, default: "" },
  age: { type: String, default: "" },
  gender: { type: String, default: "" },
  dob: { type: String, default: "" },
  qualification: { type: String, default: "" }
});

module.exports = mongoose.model("User", userSchema);