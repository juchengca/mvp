var mysql_query = require('./con');

mysql_query('show tables', function(err, result) {
  if (result.length < 1) {
    createTable();
  }
});

var createTable = () => {
  var sql = "CREATE TABLE songs (id int unsigned not null auto_increment, primary key (id), name VARCHAR(255), artist VARCHAR(255), bpm VARCHAR(255), harkey VARCHAR(255), imgurl VARCHAR(255))";
  mysql_query(sql, function(err, result)   {
    if (err) {
      console.log(err);
    }
    console.log("Table created");
  });
}

var createEntry = (name, artist, bpm, harkey, imgurl, callback) => {
  var conversionLetters = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  harkey = conversionLetters[Number(harkey)];
  var sql = `INSERT INTO songs (name, artist, bpm, harkey, imgurl) VALUES ('${name}', '${artist}', '${bpm}', '${harkey}', '${imgurl}')`;
  mysql_query(sql, function(err, result)   {
    if (err) {
      console.log(err);
    }
    callback();
  });
}

var readEntries = (callback) => {
  var sql = "SELECT * FROM songs";
  mysql_query(sql, function(err, result)   {
    if (err) {
      console.log(err);
    }
    callback(result);
  });
}

module.exports = { createEntry, readEntries };