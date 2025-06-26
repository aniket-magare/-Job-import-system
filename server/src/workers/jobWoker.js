require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' Worker connected to MongoDB'))
  .catch((err) => {
    console.error(' Worker MongoDB connection error:', err.message);
    process.exit(1);
  });



const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const fetchJobsFromAPI = require('../services/fetchJobs.service');
const Job = require('../models/Jobs');
const ImportLog = require('../models/import-log.js');

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});



const worker = new Worker(
  'job-import-queue',
  async (job) => {
    const { url } = job.data;
    console.log(`Importing from ${url}`);
    let fetched = 0,
        inserted = 0,
        updated = 0,
        failed = 0,
        failedJobs = [];

    try {
      const jobs = await fetchJobsFromAPI(url);
      fetched = jobs.length;

      for (const jobData of jobs) {
        try {
          const existing = await Job.findOne({ jobId: jobData.jobId });

          if (existing) {
            await Job.updateOne({ jobId: jobData.jobId }, jobData);
            updated++;
          } else {
            await Job.create(jobData);
            inserted++;
          }
        } catch (err) {
          failed++;
          failedJobs.push(jobData.jobId);
        }
      }

      await ImportLog.create({
        source: url,
        fetched,
        inserted,
        updated,
        failed,
        failedJobs,
      });

      console.log(` Completed import from ${url}`);
    } catch (err) {
      console.error(` Error processing job for ${url}`, err);
    }
  },
  { connection }
);
