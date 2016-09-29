var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var users = express();

var user = {
  username: 'admin',
  password: 'password'
};

users.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

users.use(bodyParser.json({})); // for parsing application/json

users.use(bodyParser.urlencoded({
  extended: true
}));

users.get('/login', function (req, res) {
  res.render('login.html');
});

users.post('/login', function (req, res) {
  if (req.body.username == user.username && req.body.password == user.password) {
    req.session.username = req.body.username;
    res.redirect('/files');
  }
  else {
    res.send('please input the right username and password');
  }
});

users.get('/files', function (req, res) {
  if (req.session.username) {
    res.render('admin.html');
  }
  else {
    res.render('files');
  }
});

module.exports = users;