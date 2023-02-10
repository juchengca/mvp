import React, { Component, useState } from 'react';

function Search( {onSearch} ) {

  const[field, setField] = useState('')

  const onChange = (e) => {
    setField(e.target.value);
  }

  const search = () => {
    console.log(field);
    onSearch(field);
  }

  return (

    <div>
      <h3>Search:</h3>
      <p>To search for a song, enter the artist then track name separated by a double dash (--)</p>
        <form>
          <label>
            <input type="text" name="track" />
          </label>
          <input onClick={search} type="submit" value="Submit" />
        </form>
    </div>

  );

}

export default Search;