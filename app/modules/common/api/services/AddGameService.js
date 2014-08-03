'use strict';

angular.module('NerderyAddGameService', ['NerderyConstants'])
  .factory('AddGame', function ($q, $http, CONSTANTS) {
    return {
      addGame: function(gameTitle) {
        var deferred = $q.defer();

        $http.jsonp(CONSTANTS.API_URL + 'addGame?callback=JSON_CALLBACK&apiKey=' + CONSTANTS.API_KEY + '&title=' + gameTitle)
          .then(function(response) {

            if(typeof response.data === 'object') {
              deferred.resolve(response.data);
            } else {
              deferred.reject(response.data);
            }
          }, function(response) {
              deferred.reject(response.data);
          });
          
        return deferred.promise;
      }
    };
  });
