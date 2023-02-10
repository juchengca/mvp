import React, { Component, useState } from 'react';

function Search( {onSearch} ) {

  const[field, setField] = useState('');

  const onChange = (e) => {
    setField(e.target.value);
  }

  const search = (e) => {
    e.preventDefault();
    onSearch(field);
  }

  return (

    <div>
      <h3>Search:</h3>
      <p>To search for a song, enter the artist then track name separated by a double dash (--)
        <br></br>
        (for ex: coldplay--yellow)
      </p>
        <form>
          <label>
            <input type="text" name="track" onChange={onChange}/>
          </label>
          <input style={{margin: 5}} onClick={search} type="submit" value="Search" />
        </form>
    </div>

  );

}

export default Search;