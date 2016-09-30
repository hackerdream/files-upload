var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');


function createFileDatabase() {
  db.run("CREATE TABLE IF NOT EXISTS files (fileName VARCHAR(255) NOT NULL,fileDestination VARCHAR(255) NOT NULL,filePath VARCHAR(255) NOT NULL,time DATETIME NOT NULL)");
}


function insertFile(fileName, fileDestination, filePath, callback) {
  db.run("INSERT INTO files VALUES (?,?,?,DATETIME('now','+8 hour'))", [fileName, fileDestination, filePath], function (err, row) {
    db.get("SELECT * from files where rowid =" + this.lastID, function (err, row) {
      callback(row);
    });
  });
}

function findFileById(itemId, callback) {
  db.get("SELECT * from files where rowid =" + itemId, function (err, row) {
    callback(row);
  });

}

function getFiles(complete) {
  var results = [];
  db.each("SELECT rowid AS id, filePath,fileName,fileDestination,time FROM files", function (err, row) {
    results.push(row);
  }, function () {
    complete(results);
  });
}

function deleteDataById(itemId, callback) {
  db.run("DELETE FROM files where rowid =" + itemId, function (err, row) {
    callback();
  });
}
exports.createFileDatabase = createFileDatabase;
exports.insertFile = insertFile;
exports.findFileById = findFileById;
exports.getFiles = getFiles;
exports.deleteDataById = deleteDataById;