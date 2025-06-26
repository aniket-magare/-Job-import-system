const express = require('express');
const router = express.Router();
const Job = require('../models/Jobs'); // Adjust path as needed

// GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

module.exports = router;
