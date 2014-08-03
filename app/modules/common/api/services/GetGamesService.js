'use strict';

angular.module('NerderyGetGamesService', ['NerderyConstants'])
  .factory('GetGames', function ($q, $http, CONSTANTS) {
    return {
      getGames: function() {
        var deferred = $q.defer();

        $http.jsonp(CONSTANTS.API_URL + 'getGames?callback=JSON_CALLBACK&apiKey=' + CONSTANTS.API_KEY)
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
