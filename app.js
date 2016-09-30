var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();

var user = require('./router/user');

var files = require('./router/files');

app.engine('html', ejs.__express);

app.set('view engine', 'html');

app.set('views', __dirname + '/views');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use(user);

app.use(files);

app.get('/', function (req, res) {
  res.render('index.html')
});

app.listen(8080, function (req, res) {
  console.log('http://localhost:8080');
});

