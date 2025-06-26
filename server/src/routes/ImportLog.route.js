const express = require('express');
const router = express.Router();
const ImportLog = require('../models/import-log.js');

router.get('/', async (req, res) => {
  try {
    const logs = await ImportLog.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    console.error('Error fetching import logs:', err);
    res.status(500).json({ error: 'Failed to fetch import logs' });
  }
});

module.exports = router;
