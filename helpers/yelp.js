const config = require('../config.js');
const request = require('request');

const key = config.YELP_KEY

module.exports = {
  getRestaurants: (query, callback) => {
    const encodedURI = encodeURI(`https://api.yelp.com/v3/businesses/search`);
    const authStr = 'Bearer '.concat(key);
    const options = {
      url: encodedURI,
      headers: { Authorization: authStr },
      qs: {
        'latitude': query.location.lat,
        'longitude': query.location.lng,
        'term': 'restaurants',
        'sort_by': query.sortBy,
        'open_now': query.open_now,
        'price': query.price
      }
    };
    request.get(options, (err, res, body) => {
      err ? console.log('getRestaurants >>>>>>>>>>>>>>>>>> error') : callback(body);
    })
  }
}
