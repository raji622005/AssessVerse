const mongoose = require("mongoose");

const brandingSchema = new mongoose.Schema({
  name: { type: String, default: "AssessVerse" },
  logoUrl: { type: String, default: "/uploads/default-logo.png" },
}, { timestamps: true });

module.exports = mongoose.model("Branding", brandingSchema);