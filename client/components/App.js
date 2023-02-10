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
                getSongs((res) => {
                    setSongs(res);
                })
            }
          })
        };

    const getSongs = (callback) => {
        $.ajax({
            url:'/getSongs',
            type:"GET",
            data:'json',
            //contentType:"application/json; charset=utf-8",
            success: (response) => {
            callback(response);
            }
        })
    };

    useEffect(() => {
        getSongs((res) => {
            setSongs(res);
        })
        }, []);

    return (
        <div style={{color: 'white', fontFamily: 'Helvetica', margin: '25px' }}>
            <style>{'body { background-color: rgba(40, 40, 40, 1.0); }'}</style>
            <h1>♬ Song Analysis Fetcher ♪</h1>
            <a style={{color: 'skyblue'}} href='/login'>Login to Spotify</a>
            <Search onSearch={search}/>
            <List songs={songs}/>
        </div>
    );
}

export default App;