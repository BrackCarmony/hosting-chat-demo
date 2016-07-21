angular.module("myChats").service("mainSrvc", function($http){

  var baseUrl = "http://practiceapi.devmounta.in";

  this.getChats = function(){
    return $http.get(baseUrl + "/api/chats").then(
      function(response){
        return response.data;
    })
  }

  this.addChats = function(chat){
    return $http.post(baseUrl + "/api/chats", chat)
  }

  this.deleteChats = function(){
    return $http.delete(baseUrl + "/api/chats");
  }

  this.sendCookie = function(){
    return $http.post(baseUrl + "/api/cookies");
  }
  this.getCookies = function(){
    return $http.get(baseUrl + "/api/cookies").then(
      function(response){
        return response.data;
    });
  }
});
