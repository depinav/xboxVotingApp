'use strict';

angular.module('NerderySetGotItService', ['NerderyConstants'])
  .factory('SetGotIt', function ($q, $http, CONSTANTS) {
    return {
      setGotIt: function(gameId) {

        return $http.get(CONSTANTS.API_URL + 'setGotIt?callback=&apiKey=' + CONSTANTS.API_KEY + '&id=' + gameId)
          .then(function(response) {

            if(response.data === 'true') {
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
