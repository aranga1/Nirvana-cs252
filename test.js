var fs = require('fs');
var file = "test.db";
var exists = fs.existsSync(file);

if(!exists) {
    console.log("Creating DB file.");
    fs.openSync(file, "w");
}

console.log("2");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
console.log("3");

db.serialize(function() {
  console.log("4");
  if (!exists) {
    console.log("doesnt exist, creating a table");
    //db.run("CREATE TABLE Stuff (thing TEXT)");
    db.run("CREATE TABLE test (test_ID int,test_name varchar(255));");
  }

  var stmt = db.prepare("INSERT INTO test (test_ID, test_name) VALUES (?, ?);");

  //var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");

  //var rnd;
  //for (var i = 0; i < 10; i++) {
    //rnd = Math.floor(Math.random() * 10000000);
  //}
    stmt.run('123', 'TESTING TESTING 123');

  stmt.finalize();

  /*db.each("SELECT rowid AS id, thing FROM Stuff", function(err, row) {
    //console.log(row.id + ": " + row.thing);
  });*/
  db.each("SELECT * FROM test", function(err, row) {
    console.log(row.test_ID + " and we also got " + row.test_name);
    });
});

db.close();


