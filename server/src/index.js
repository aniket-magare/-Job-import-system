// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');
// const jobQueue = require('./queues/jobQueue');

// const app = express();
// const PORT = process.env.PORT || 5000;

// connectDB();
// app.use(express.json());

// // Enqueue jobs from multiple XML feeds
// const FEEDS = [
//   'https://jobicy.com/?feed=job_feed',
//   'https://jobicy.com/?feed=job_feed&job_categories=data-science',
//   'https://www.higheredjobs.com/rss/articleFeed.cfm'
// ];

// app.get('/run-import', async (req, res) => {
//   try {
//     await Promise.all(
//       FEEDS.map(url => jobQueue.add('import-job', { url }))
//     );
//     res.status(200).json({ message: 'Import jobs enqueued successfully!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to enqueue jobs' });
//   }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');
// const jobQueue = require('./queues/jobQueue');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());

// // Example XML feeds
// const FEEDS = [
//   'https://jobicy.com/?feed=job_feed',
//   'https://jobicy.com/?feed=job_feed&job_categories=data-science',
//   // 'https://www.higheredjobs.com/rss/articleFeed.cfm'
// ];

// // Trigger import
// app.get('/run-import', async (req, res) => {
//   try {
//     await Promise.all(
//       FEEDS.map((url) => jobQueue.add('import-job', { url }))
//     );
//     console.log(' Jobs successfully added to queue');
//     res.status(200).json({ message: 'Import jobs enqueued successfully!' });
//   } catch (err) {
//     console.error(' Failed to enqueue jobs:', err);
//     res.status(500).json({ error: 'Failed to enqueue jobs' });
//   }
// });

// // 👇 THIS is your connection + server starter
// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   } catch (err) {
//     console.error(' Failed to connect to MongoDB:', err);
//   }
// };

// startServer();


// added path and route 
require('dotenv').config({ path: '../.env' });

const express = require('express');
const connectDB = require('./config/db');
const jobQueue = require('./queues/jobQueue');
const jobRoutes = require('./routes/jobs.route'); // Import your job route
const importLogRoutes = require('./routes/ImportLog.route'); // added thiw 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// 👇 Register your routes here
app.use('/api/jobs', jobRoutes); // Expose /api/jobs to frontend
// app.use('/api/ImportLog', importLogRoutes);
app.use('/api/import-logs', importLogRoutes);

const cors = require('cors');
app.use(cors());



// Example XML feeds for import
const FEEDS = [
  'https://jobicy.com/?feed=job_feed',
  'https://jobicy.com/?feed=job_feed&job_categories=data-science',
  // Add more feeds if needed
];

// Trigger job import via BullMQ queue
app.get('/run-import', async (req, res) => {
  try {
    await Promise.all(FEEDS.map(url => jobQueue.add('import-job', { url })));
    console.log('✅ Jobs successfully added to queue');
    res.status(200).json({ message: 'Import jobs enqueued successfully!' });
  } catch (err) {
    console.error('❌ Failed to enqueue jobs:', err);
    res.status(500).json({ error: 'Failed to enqueue jobs' });
  }
});

// Start the server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
  }
};

startServer();
