import React, { Component } from 'react';

function List({songs}) {

  const listSongs = songs.map((song) => {
    <li>{song}</li>
  })

  return (

    <div><h3>Song Library:</h3>
      <ul>{listSongs}</ul>
    </div>

  );

}

export default List;