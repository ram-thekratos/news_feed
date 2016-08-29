var newsFeedServices = angular.module('newsFeedServices',[]);

newsFeedServices.factory('$newsFeedServices', ['$log', '$http', function($log, $http) {
  return {
    fetch : function(callback) {
      /* Dummy service which will return a random news event from the response JSON.
         This news event (ex: like / share a page) will be passed to the callback and will be displayed in the panel. */
      var uri = "../json/dummyResponse.json";
      try {
        $http.get(uri).success(function(response,status,headers,config) {
         var data = response[Math.floor(Math.random()*response.length)];     
         callback(data);          
        }).error(function(response,status,headers,config) {
            $log.error("--> ERROR status : " + status + " data : " + response); 
        });
      } catch(err) {
        $log.error(err);
      }
   }
 }
}]);