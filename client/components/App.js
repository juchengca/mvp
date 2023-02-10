import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import Search from './Search';
import List from './List';
import $ from 'jquery';

function App() {

    // check for access token to spotify api
    var access_token = '';
    var refresh_token = '';
    const checkTokens = () => {
        const currentURL = window.location.href;
        if (currentURL.includes('access_token')) {
            var tokens = currentURL.split('=');
            access_token = tokens[1].slice(0,tokens[1].length-14);
            refresh_token = tokens[2];
        }
    }
    checkTokens();

    const [songs, setSongs] = useState([]);

    const search = (field) => {
        var field = field.split('--');
        var endpoint = 'https://api.spotify.com/v1/search?q=';
        var artist = field[0];
        var song = field[1];
        var mid_url = encodeURIComponent(encodeURIComponent('remaster track:' + song + ' artist:' + artist));
        var search_url = endpoint + mid_url + '&type=track&market=US&limit=10&offset=5';
        $.ajax({
            url:'/testSearch',
            type:"POST",
            data:{'search_url': search_url, 'access_token': access_token},
            success: (response) => {
              console.log('Search success!');
              setSongs(response.tracks.items[0]);
              for (var i = 0; i < response.tracks.items.length; i++) {
                console.log(response.tracks.items[i].artists[0].name);
              }
            }
          })
        };

    return (
        <div>
            <h1>Song Fetcher</h1>
            <a href='/login'>Login to Spotify</a>
            <Search onSearch={search}/>
            <List songs={songs}/>
        </div>
    );
}

export default App;