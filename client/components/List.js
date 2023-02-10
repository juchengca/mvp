import React, { Component } from 'react';

function List({songs}) {

  return (

    <div>
      <h3>Song Library:</h3>
      <ol>
        {songs.map((song) =>
          <li style={{marginBottom: 20, marginLeft: 0}} key={song.name}>
          <img style={{float: "left", marginRight: 10, marginTop: 3}} src={song.imgurl}/>
              Name: {song.name}
              <br></br>
              Artist: {song.artist}
              <br></br>
              BPM: {song.bpm}
              <br></br>
              Key: {song.harkey}
        </li>)}
      </ol>
    </div>

  );

}

export default List;