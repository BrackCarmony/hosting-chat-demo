var express = require("express");
var app = express();
var serverConfig = require("./../server_config.js");
var port = serverConfig.serverPort;

app.listen(port, function(){
  console.log("Listeing on port ", port);
})
