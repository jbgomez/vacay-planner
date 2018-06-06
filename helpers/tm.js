const request = require('request-promise');
const config = require('../config.js');

const key = config.TM_KEY

const tm = (options, cb) => {
  options.apikey = key;

  request.get({
    method: 'GET',
    uri: 'https://app.ticketmaster.com/discovery/v2/events.json',
    qs: options,
    json: true
  })
  .then((data) => cb(data._embedded ? data._embedded.events : null))
  .catch(err => cb(err));
};

module.exports = tm;