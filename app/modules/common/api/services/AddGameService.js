'use strict';

angular.module('NerderyAddGameService', ['NerderyConstants'])
  .factory('AddGame', function ($q, $http, CONSTANTS) {
    return {
      getGames: function(gameTitle) {

        return $http.get(CONSTANTS.API_URL + 'addGame?callback=&apiKey=' + CONSTANTS.API_KEY + '&title=' + gameTitle)
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
