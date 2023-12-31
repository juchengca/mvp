var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var spotify = require('../helpers/spotify');
var db = require('../database/entry');

var client_id = ''; // Your client id
var client_secret = ''; // Your secret
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();


app.use(express.static(__dirname + '/../client/dist'))
   .use(express.json())
   .use(express.urlencoded({ extended: true }))
   .use(cors())
   .use(cookieParser());


/*
app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());
*/

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));

   /*
   var loginURL = 'https://accounts.spotify.com/authorize?' +
   querystring.stringify({
     response_type: 'code',
     client_id: client_id,
     scope: scope,
     redirect_uri: redirect_uri,
     state: state
   });

   res.json(loginURL);
   */
});

app.post('/searchTrack', function(req, res) {

  var entry = {};
  // generate search url
  var field = req.body.search_url;
  var field = field.split('--');
  var endpoint = 'https://api.spotify.com/v1/search?q=';
  var artist = field[0];
  var song = field[1];
  var mid_url = encodeURIComponent(encodeURIComponent('remaster track:' + song + ' artist:' + artist));
  var search_url = endpoint + mid_url + '&type=track&market=US&limit=10&offset=5';
  req.body.search_url = search_url;
  // search spotify for track
  spotify.searchSpotify(req.body, (result) => {
    entry.name = result.tracks.items[0].name;
    entry.artist = result.tracks.items[0].artists[0].name;
    entry.imgurl = result.tracks.items[0].album.images[2].url.toString();
    // generate search url for audio analysis
    var id = result.tracks.items[0].id;
    var endpoint = 'https://api.spotify.com/v1/audio-analysis/';
    var search_url = endpoint + id;
    req.body.search_url = search_url;
    // get audio analysis
    spotify.getDetails(req.body, (result) => {
      entry.bpm = Math.floor(result.track.tempo).toString();
      entry.harkey = result.track.key.toString();
      db.createEntry(entry.name, entry.artist, entry.bpm, entry.harkey, entry.imgurl, () => {
        console.log('Entry successful: ', entry.name);
        res.send();
      });
    });
  });
});

app.get('/getSongs', function(req, res) {
  db.readEntries((result) => {
    //console.log(result);
    res.send(result);
  })
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          //console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});

/*
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => {
  res.send('Hi thereeee');
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
*/
