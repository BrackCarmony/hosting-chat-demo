angular.module("myChats").service("mainSrvc", function($http){

  var baseUrl = "http://brackcarmony.com:8092";

  this.getChats = function(){
    return $http.get(baseUrl + "/api/chats").then(
      function(response){
        console.log(response);
        return response.data;
    })
  }

  this.addChats = function(chat){
    console.log(chat);
    return $http.post(baseUrl + "/api/chats", chat)
  }

  this.deleteChats = function(){
    return $http.delete(baseUrl + "/api/chats");
  }

  this.sendCookie = function(){
    return $http.post(baseUrl + "/api/cookies");
  }
  this.getCookies = function(){
    return $http.get(baseUrl + "/api/cookies");
  }
});
