'use strict';

angular.module('NerderyAddGameService', ['NerderyConstants'])
  .factory('AddGame', function ($q, $http, CONSTANTS) {
    return {
      addGame: function(gameTitle) {

        return $http.get(CONSTANTS.API_URL + 'addGame?callback=&apiKey=' + CONSTANTS.API_KEY + '&title=' + gameTitle)
          .then(function(response) {

            if(typeof response.data === 'object') {
              deferred.resolve(response);
            } else {
              return $q.reject(response.data);
            }
          }, function(response) {
              return $q.reject(response.data);
          });
          
          return deferred.promise;
      }
    };
  });
