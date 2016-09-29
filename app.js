var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var app = express();

var user = require('./router/user');

app.engine('html', ejs.__express);

app.set('view engine', 'html');

app.set('views', __dirname + '/views');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use(user);

app.get('/', function (req, res) {
  res.render('index.html')
});

app.listen(8080, function (req, res) {
  console.log('http://localhost:8080');
});

