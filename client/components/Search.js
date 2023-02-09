import React, { Component } from 'react';

function Search() {

  return (

    <div>
      <h3>Search:</h3>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
    </div>

  );

}

export default Search;