angular.module("myChats").controller("mainCtrl", function($scope, mainSrvc, $interval){
  $scope.test = "Chatting With Cookies is the Best";

  $scope.addChat = function(chatmessage){
    mainSrvc.addChats(chatmessage).then(function(){
      getData();
      $scope.newChat.message = "";
    });
  }

  function getData(){
    mainSrvc.getChats().then(function(response){
      $scope.chats = response;

    });
    mainSrvc.getCookies().then(function(response){
      $scope.cookies = response
    })
  }

  $scope.deleteChats = function(){
    mainSrvc.deleteChats().then(function(){
      getData();
    });
  }

  $scope.sendCookie = mainSrvc.sendCookie;

  getData();

  $interval(getData, 3000);

})
