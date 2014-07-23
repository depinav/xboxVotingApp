'use strict';

angular.module('NerderyGetGamesService', ['NerderyConstants'])
  .factory('GetGames', function ($q, $http, CONSTANTS) {
    return {
      getGames: function() {

        return $http.get(CONSTANTS.API_URL + 'getGames?callback=&apiKey=' + CONSTANTS.API_KEY)
          .then(function(response) {

            if(typeof response.data === 'object') {
              return response.data;
            } else {
              return $q.reject(response.data);
            }
          }, function(response) {
              return $q.reject(response.data);
          });
      }
    };
  });
