import React, { useEffect, Component } from 'react';
import Search from './Search';
import List from './List';

function App() {

    const checkTokens = () => {
        const currentURL = window.location.href;
        if (currentURL.includes('access_token')) {
            var tokens = currentURL.split('=');
            var access_token = tokens[1].slice(0,tokens[1].length-14);
            var refresh_token = tokens[2];
        }
    }

    checkTokens();

    return (
        <div>
            <h1>Song Fetcher</h1>
            <a href='/login'>Login to Spotify</a>
            <Search />
            <List />
        </div>
    );
}

export default App;