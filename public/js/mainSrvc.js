angular.module("myChats").service("mainSrvc", function($http){


  this.getChats = function(){
    return $http.get("/api/chats").then(
      function(response){
        console.log(response);
        return response.data;
    })
  }

  this.addChats = function(chat){
    console.log(chat);
    return $http.post("/api/chats", chat)
  }

  this.deleteChats = function(){
    return $http.delete("/api/chats");
  }

  this.sendCookie = function(){
    return $http.post("/api/cookies");
  }
});
