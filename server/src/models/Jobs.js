const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobId: { type: String, unique: true },
  title: String,
  company: String,
  description: String,
  location: String,
  url: String,
  postedAt: Date,
});

module.exports = mongoose.model('Job', JobSchema);
