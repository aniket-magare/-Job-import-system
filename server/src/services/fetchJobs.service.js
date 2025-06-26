const fetchXML = require('../utils/XMLparser');
const Job = require('../models/Jobs');

const normalizeJob = (item) => ({
  jobId: item.guid, // Adjust based on actual XML structure
  title: item.title,
  company: item['dc:creator'] || 'Unknown',
  description: item.description,
  location: item.location || 'Remote',
  url: item.link, 
  postedAt: new Date(item.pubDate),
});

const fetchJobsFromAPI = async (sourceUrl) => {
  try {
    const json = await fetchXML(sourceUrl);
    const items = json?.rss?.channel?.item || [];

    if (!items.length) {
      console.log(`No job items found in feed: ${sourceUrl}`);
    }

    const jobs = items.map(normalizeJob);
    console.log(` Normalized ${jobs.length} jobs from ${sourceUrl}`); //  this line is key

    return jobs;
  } catch (err) {
    console.error('Job fetch error:', err);
    return [];
  }
};


module.exports = fetchJobsFromAPI;
