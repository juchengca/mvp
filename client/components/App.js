import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import Search from './Search';
import List from './List';
import $ from 'jquery';

function App() {

    var loginText = 'Login to Spofity';

    // check for access token to spotify api
    if (window.location.href !== 'http://localhost:3000/') {
        loginText = 'Logged into Spotify';
    }
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
/*
    const changeText = () => {
        setLogInText('Logged into Spoity');
    }
    */

    useEffect(() => {
        getSongs((res) => {
            setSongs(res);
        })
    }, []);

    return (
        <div style={{color: 'white', fontFamily: 'Helvetica', margin: '25px' }}>
        <div style={{backgroundImage: `url("https://imgs.classicfm.com/images/218395?crop=16_9&width=660&relax=1&signature=q7SbbezAL_Tgo3vNAh8Ef7mm1oU=")`}}>
            <style>{'body { background-color: rgba(40, 40, 40, 1.0); }'}</style>
            <p style={{color: 'black'}}>.</p>
            <h1 style={{margin: '-10px', display: 'flex',  justifyContent:'center', alignItems:'center'}}>♬ Jam Buddy ♪</h1>
            <p>.</p>
            </div>
            <div>
            <p style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            Add songs to your library for immediate access to the track bpm, key, lyrics, and chords!
            </p>
            <a style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} href='/login'>
            <button type="button">{loginText}</button>
            </a>
            <Search onSearch={search}/>
            <List songs={songs}/>
            </div>
            </div>
    );
}

export default App;