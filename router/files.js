var express = require('express');
var multer = require('multer');
var fs = require('fs');
var upload = multer({dest: 'uploads/'});

var files = express();

files.get('/files', function (req, res) {

});

files.post('/files', upload.single('file'), function (req, res) {
  if (req.session.username) {
    fs.rename(req.file.destination + req.file.filename, req.file.destination + req.file.originalname, function (err) {
      if (err) {
        res.send("error\n");
      } else {
      }
      res.send('success\n');
    });
  }
});

module.exports = files;