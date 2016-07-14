var express = require("express");
var app = express();
var serverConfig = require("./../server_config.js");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var _ = require('underscore');
var port = serverConfig.serverPort;
var cors = require('cors');

var getIP = require('ipware')().get_ip;


var adjectives = ["Tasty","Great","Delicious", "Palatable", "Luscious", "Mourthwatering", "Delectable", "Dainty", "Flavorful"];
var cookieTypes = ["Black and White", "Butter", "Butter Pecan", "Chocolate Chip", "Christmas", "Coconut Macaroon", "Macaroon", "Fortune", "Fudge", "Gingerbread"];
var mycookie = {};


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

app.use(customCookies)




var chats = [];
var cookies = {};
app.get("/api/chats", function(res,res){
  res.send({chats:chats});
})

app.post("/api/chats", function(req,res){
  // console.log('message', req.body.message);
  req.body.message = req.body.message.slice(0,1000);
  req.body.cookie = req.cookieType;
  req.body.createdAt = new Date();
  chats.push(req.body);
  while (chats.length>100){
    chats.shift();
  }
  res.sendStatus(200);
})

app.delete("/api/chats", function(req, res){
  chats = [];
  // console.log("Communications Terminated");
  res.sendStatus(200);
})

app.post("/api/cookies", function(req, res){

  var ipInfo = getIP(req);
    console.log(ipInfo);
  if (!cookies[req.cookieType]){
    cookies[req.cookieType] = 1;
  }else{
    cookies[req.cookieType]++;
  }

  res.sendStatus(200);
});

app.get("/api/cookies", function(res,res){
  res.send({cookies:cookies});
})


app.listen(port, function(){
  console.log("Listeing on port ", port);
});

function customCookies(req, res, next){
  // console.log("CustomeCookies");
  var ipInfo = getIP(req);
  console.log("ipInfo", ipInfo);
  console.log("req.ips", req.ips);


  if (!mycookie[ipInfo]){

    mycookie[ipInfo] = adjectives[Math.floor(Math.random()*adjectives.length)]
    + " " + cookieTypes[Math.floor(Math.random()*cookieTypes.length)]
    + " Cookie"
    // console.log("New Cookie", req.session.cookieType);
  }

  req.cookieType = mycookie[ipInfo];
  next();
}

function filter(str){
  // var string = str.toString();

  for (var i =0;i<filters.length;i++){
    for (var j=0;j<filters[i].input.length;j++){
      str = str.replace(filters[i].input[j], filters[i].output[Math.floor(Math.random()*filters[i].output.length)]);
    }
  }
  return str;
}
