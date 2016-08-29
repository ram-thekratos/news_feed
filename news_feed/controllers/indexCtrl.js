var indexCtrl = angular.module('index_app',['ui.bootstrap', 'newsFeedServices']);

indexCtrl.controller('indexCtrl', ['$scope', '$newsFeedServices', '$compile','$document',
										function($scope, $newsFeedServices, $compile, $document) {
    //===== Function to get any one post after the page is loaded ========== //
    angular.element(document).ready(function() {
    $newsFeedServices.fetch($scope.updateNewsFeed);
	});

    //===== Call the services every 10 seconds to update the news feed ========== //
    setInterval(function(){
  	 $newsFeedServices.fetch($scope.updateNewsFeed);
	}, CONFIG.fetch_interval)

    //======== Callback function to update the news feed panel based on the response =====//
	$scope.updateNewsFeed = function(data){
		var newElement = $compile($scope.getDirective(data.eventType))($scope);
		var panel = $document[0].getElementById('feedPanel');
		angular.element(panel).prepend(newElement);
	};

	//=========== Get the custom directive based on the response =========== //
    $scope.getDirective = function(eventType){
     var template;
     if(eventType) {
     	template = "<div class=topMargin "+eventType+"-directive = 'n'> </div>";
     }
     return template;
    };
}]);


//========== Creating the custom directives for each of the event types =========== //

//======== This function is for the "like" event in the news feed ============= //

indexCtrl.directive( 'likeDirective', function ( $compile ) {
  return {
    restrict: 'EA',
    scope: {text: '@' },
    template: "<div> <img src='../images/likePost.PNG'></div>"
  };
});

//======== This function is for the "share" event in the news feed ============= //

indexCtrl.directive( 'shareDirective', function ( $compile ) {
  return {
    restrict: 'EA',
    scope: {text: '@' },
    template: "<div><img src='../images/sharePost.PNG'></div>"
  };
});

//======== This function is for the "friendship" event in the news feed ============= //

indexCtrl.directive( 'friendDirective', function ( $compile ) {
  return {
    restrict: 'EA',
    scope: {text: '@' },
    template: "<div><img src='../images/friendPost.PNG'></div>"
   };
  });

//======== This function is for the "group post" event in the news feed ============= //

indexCtrl.directive( 'groupDirective', function ( $compile ) {
  return {
    restrict: 'EA',
    scope: {text: '@' },
    template: "<div><img src='../images/groupPost.PNG'></div>"
  };
});
