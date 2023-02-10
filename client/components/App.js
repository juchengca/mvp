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
        var entry = {};
        $.ajax({
            url:'/searchTrack',
            type:"POST",
            data:{'search_url': field, 'access_token': access_token},
            success: (response) => {
                console.log(response);
            }
          })
        };

    return (
        <div>
            <h1>Song Fetcher</h1>
            <a href='/login'>Login to Spotify</a>
            <Search onSearch={search}/>
            <List />
        </div>
    );
}

export default App;