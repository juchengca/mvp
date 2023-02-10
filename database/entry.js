var mysql_query = require('./con');

mysql_query('show tables', function(err, result) {
  if (result.length < 1) {
    createTable();
  }
});

var createTable = () => {
  var sql = "CREATE TABLE songs (id int unsigned not null auto_increment, primary key (id), name VARCHAR(255), artist VARCHAR(255), bpm VARCHAR(255), harkey VARCHAR(255))";
  mysql_query(sql, function(err, result)   {
    if (err) {
      console.log(err);
    }
    console.log("Table created");
  });
}

var createEntry = (name, artist, bpm, harkey, callback) => {
  var sql = `INSERT INTO songs (name, artist, bpm, harkey) VALUES ('${name}', '${artist}', '${bpm}', '${harkey}')`;
  mysql_query(sql, function(err, result)   {
    if (err) {
      console.log(err);
    }
    callback();
  });
}

module.exports = { createEntry };