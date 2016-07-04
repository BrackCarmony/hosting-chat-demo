var express = require("express");
var app = express();

var port = 80;

app.use(express.static(__dirname+'/../newChats'));

app.listen(port, function(){
  console.log("Listeing on port ", port);
});
