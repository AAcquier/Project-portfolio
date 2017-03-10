angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
	
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  /*$scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);*/
	
		//This fetches the U-Values of the components in the locla storage
		var UVWall=JSON.parse(localStorage.getItem("UValueWall"));
		var UVRoof=JSON.parse(localStorage.getItem("UValueRoof"));
		var UVFloor=JSON.parse(localStorage.getItem("UValueFloor"));
		var UVWindows=JSON.parse(localStorage.getItem("UValueWindows"));
		
		
		//This updates the U-Values inthe Input 2 screen
		$("#UValWall").text("Walls' U-Value: "+UVWall);
		$("#UValRoof").text("Roof's U-Value: "+UVRoof);
		$("#UValFloor").text("Floor's U-Value: "+UVFloor);
		$("#UValWindows").text("Windows' U-Value: "+UVWindows);
  //};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
 // $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  /*$scope.settings = {
    enableFriends: true
  };*/
  
  //This part fetches the different variables needed to update the cost of heating in the local storage
  var price=JSON.parse(localStorage.getItem("elecPrice"));
  var WHL=JSON.parse(localStorage.getItem("wallHeatLoss"));
  var RHL=JSON.parse(localStorage.getItem("roofHeatLoss"));
  var FHL=JSON.parse(localStorage.getItem("floorHeatLoss"));
  var WiHL=JSON.parse(localStorage.getItem("windowsHeatLoss"));
  var DHL=JSON.parse(localStorage.getItem("doorsHeatLoss"));
  
  
  //This part calculates and updates the cost of heating in the Results screen
  $("#wall").text("Walls cost: €"+Math.round(WHL*price));
  $("#roof").text("Roof cost: €"+Math.round(RHL*price));
  $("#floor").text("Floor cost: €"+Math.round(FHL*price));
  $("#windows").text("Windows cost: €"+Math.round(WiHL*price));
  $("#doors").text("Doors cost: €"+Math.round(DHL*price));
  $("#total").text("Total cost: €"+Math.round((WHL*price)+(RHL*price)+(FHL*price)+(WiHL*price)+(DHL*price)));
  
  //This fetches the latitude and the longitude in the local storage
  var latitude=JSON.parse(localStorage.getItem("latitude"));
  var longitude=JSON.parse(localStorage.getItem("longitude"));
  
  //Thsi part updates the latitude and longitude in the Results screen
  $("#lat").text("LATITUDE:  "+latitude);
  $("#lon").text("LONGITUDE: "+longitude);
  
});
