// const axios = require('axios');
// const parser = require('fast-xml-parser');

// const fetchAndParseXML = async (url) => {
//   try {
//     const { data } = await axios.get(url);
//     const parsed = parser.parse(data, {
//       ignoreAttributes: false,
//       attributeNamePrefix: '@_',
//     });
//     return parsed;
//   } catch (error) {
//     console.error(`Error fetching XML from ${url}:`, error.message);
//     throw error;
//   }
// };

// module.exports = fetchAndParseXML;


const axios = require('axios');
const { XMLParser } = require('fast-xml-parser'); // ✅ Correct usage

const fetchAndParseXML = async (url) => {
  try {
    const { data } = await axios.get(url);
    const parser = new XMLParser(); // ✅ Create a parser instance
    const parsed = parser.parse(data);
    return parsed;
  } catch (error) {
    console.error(`Error fetching XML from ${url}:`, error.message);
    throw error;
  }
};

module.exports = fetchAndParseXML;

