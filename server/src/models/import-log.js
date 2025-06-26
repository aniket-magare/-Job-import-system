const mongoose = require('mongoose');
const ImportLog = require('../models/import-log');


const ImportLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  source: String,
  fetched: Number,
  inserted: Number,
  updated: Number,
  failed: Number,
  failedJobs: [String],
});

module.exports = mongoose.model('ImportLog', ImportLogSchema);
