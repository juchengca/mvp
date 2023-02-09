var mysql_query = require('./con');

mysql_query('show tables', function(err, result) {
  if (result.length < 1) {
    createTable();
  }
});

var createTable = () => {
  var sql = "CREATE TABLE songs (name VARCHAR(255), artist VARCHAR(255), bpm VARCHAR(255), harkey VARCHAR(255))";
  mysql_query(sql, function(err, result)   {
    if (err) {
      console.log(err);
    }
    console.log("Table created");
  });
}