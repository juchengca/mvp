var mysql = require('mysql2');

var sqlConnection = (sql, next) => {

  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "song_fetcher"
  });

  connection.connect(function(err) {
      if (err !== null) {
          console.log("[MYSQL] Error connecting to mysql:" + err+'\n');
      }
      connection.query('use song_fetcher', function(err) {
        if (err) {
          console.log(err);
        }
      })
  });

  connection.query(sql, function(err) {

      connection.end(); // close the connection

      if (err) {
          throw err;
      }

      // Execute the callback
      next.apply(this, arguments);
  });
}

module.exports = sqlConnection;

/*
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) {
    console.log(err);
  }
  console.log("Connected!");
  con.query("CREATE DATABASE test", function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("Database created");
    con.query("show databases", function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("result: ", result);
    })
  });
});
*/