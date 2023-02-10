const axios = require('axios');

let searchSpotify = (query, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  /*
      headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  */
    console.log(query);

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
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

module.exports.searchSpotify = searchSpotify;