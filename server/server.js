var express = require("express");
var app = express();
var serverConfig = require("./../server_config.js");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var _ = require('underscore');
var port = serverConfig.serverPort;
var cors = require('cors');

app.use(cors());
app.use(express.static(__dirname+'/../public'));
app.use(bodyParser.json());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'Whahaha Cookies For All',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

require('./controllers/chatCtrl')(app);

app.listen(port, function(){
  console.log("Listeing on port ", port);
});
