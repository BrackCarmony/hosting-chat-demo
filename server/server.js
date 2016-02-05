var express = require("express");
var app = express();
var serverConfig = require("./../server_config.js");
var bodyParser = require('body-parser');
var port = serverConfig.serverPort;

app.use(express.static(__dirname+'/../public'));
app.use(bodyParser.json())

var chats = [];
app.get("/api/chats", function(res,res){
  res.send(chats);
})
app.post("/api/chats", function(req,res){
  chats.push(req.body)
  console.log(chats);
  res.sendStatus(200);
})
app.delete("/api/chats", function(req, res){
  chats = [];
  console.log("hmmm");
  res.sendStatus(200);
})

app.listen(port, function(){
  console.log("Listeing on port ", port);
});
