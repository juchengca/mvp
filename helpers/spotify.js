const axios = require('axios');

let searchSpotify = (query, callback) => {
  let options = {
    method: 'get',
    url: query.search_url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + query.access_token
    }
  };
  axios(options)
  .then(res => {
    callback(res.data);
  })
}

let getDetails = (query, callback) => {
  let options = {
    method: 'get',
    url: query.search_url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + query.access_token
    }
  };
  axios(options)
  .then(res => {
    callback(res.data);
  })
}

module.exports = { searchSpotify, getDetails };