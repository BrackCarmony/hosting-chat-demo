angular.module('myChatApp',[]).controller('chatCtrl', function($scope, chatSvc){

  $scope.messages= [];
  $scope.addChats = function(message){
    $scope.message = "";
    chatSvc.sendChat(message).then(function(){
      getChats();
    });;

  }
  getChats = function(){
    chatSvc.getChats().then(function(result){
      console.log(result);
      $scope.messages = result.reverse();
    });
  }
  $scope.clearChats = function(){
    console.log("HMmm");
    chatSvc.clearChats().then(function(){getChats();});
  }
  getChats()
  setInterval(getChats,2000)
})
.service('chatSvc',function($http){
  this.getChats = function(){
    return $http.get('/api/chats').then(function(res){
      console.log(res);
      return res.data
    }, function(err){})
  }
  this.sendChat = function(message){
    return $http.post('/api/chats', {message:message}).then(function(res){}, function(err){})
  }
  this.clearChats = function(){
    return $http.delete('/api/chats');
  }
})
