const request = require('request-promise');
const config = require('../config.js');

const key = config.TM_KEY

const tm = (options, cb) => {
  request.get({
    method: 'GET',
    uri: 'https://app.ticketmaster.com/discovery/v2/events.json',
    qs: {
      startDateTime: options.startDate,
      endDateTime: options.endDate,
      city: options.city,
      stateCode: options.stateCode,
      size: options.size,
      apikey: key
    },
    json: true
  })
  .then((data) => cb(data._embedded.events))
  .catch((xhr, status, err) => console.log(err))
};

module.exports = tm;