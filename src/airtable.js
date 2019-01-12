console.log("AIRTABLE API KEY:", process.env.AIRTABLE_API_KEY);

const AirTable = require('airtable');

AirTable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});

const base = AirTable.base(process.env.AIRTABLE_BASE_ID);

module.exports = base;