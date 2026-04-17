const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment');

router.post('/create', async (req, res) => {
  try {
    const newAssessment = new Assessment(req.body);
    const savedAssessment = await newAssessment.save();
    res.status(201).json({ message: "Assessment Saved!", data: savedAssessment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while saving assessment." });
  }
});

module.exports = router;