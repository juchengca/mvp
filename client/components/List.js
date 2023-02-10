import React, { Component } from 'react';

function List({songs}) {

  return (

    <div>
      <h3>Song Library:</h3>
      <ol>{
        songs.map((song) => <li style={{marginBottom: 20, marginLeft: 0}} key={song.name}>
      <div>Name: {song.name}</div>
      <div>Artist: {song.artist}</div>
      <div>BPM: {song.bpm}</div>
      <div>Key: {song.harkey}</div>
      </li>)}
    </ol>
    </div>

  );

}

export default List;