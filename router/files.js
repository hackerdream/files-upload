var express = require('express');
var multer = require('multer');
var fs = require('fs');
var upload = multer({dest: 'uploads/'});
var files = express();
var fileData = require('../files');


fileData.createFileDatabase();

files.get('/files', function (req, res) {
  fileData.getFiles(function (result) {
    res.send(result);
  })
});

files.post('/upload', upload.single('file'), function (req, res) {
  fs.rename(req.file.destination + req.file.filename, req.file.destination + req.file.originalname, function (err) {
    if (err) {
      console.log("error\n");
    } else {
      fileData.insertFile(req.file.originalname, req.file.destination, req.file.destination + req.file.filename);
      res.setHeader('Content-Type', "application/json");
      res.send(JSON.stringify({
        message:"ok"
      }));
    }
  });
});


files.get('/download/:id', function (req, res) {
  fileData.findFileById(req.params.id, function (result) {
    res.download(result.fileDestination + '/' + result.fileName);
  });
});

files.delete('/delete/:id', function (req, res) {
  fileData.findFileById(req.params.id, function (result) {
    fs.unlink(__dirname + '/../' + result.fileDestination + result.fileName, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("删除成功！");
      }
      fileData.deleteDataById(req.params.id, function () {
        res.send('delete success.');
      });
    });
  });
});

module.exports = files;