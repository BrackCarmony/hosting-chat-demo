var adjectives = ["Tasty","Great","Delicious", "Palatable", "Luscious", "Mourthwatering", "Delectable", "Dainty", "Flavorful"];
var cookieTypes = ["Black and White", "Butter", "Butter Pecan", "Chocolate Chip", "Christmas", "Coconut Macaroon", "Macaroon", "Fortune", "Fudge", "Gingerbread"];
var mycookie = {};

module.exports = function(app){

  app.use(customCookies)

  var chats = [];
  var cookies = {};
  app.get("/api/chats", function(res,res){
    res.send(chats);
  })

  app.post("/api/chats", function(req,res){
    // console.log('message', req.body.message);
    req.body.message = req.body.message.slice(0,1000);
    req.body.cookie = req.cookieType;
    req.body.createdAt = new Date();
    chats.push(req.body);
    while (chats.length>50){
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


  function customCookies(req, res, next){
    if (!mycookie[req.headers['user-agent']]){

      mycookie[req.headers['user-agent']] = adjectives[Math.floor(Math.random()*adjectives.length)]
      + " " + cookieTypes[Math.floor(Math.random()*cookieTypes.length)]
      + " Cookie"
      // console.log("New Cookie", req.session.cookieType);
    }

    req.cookieType = mycookie[req.headers['user-agent']];
    next();
  }
}
