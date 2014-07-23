'use strict';

angular.module('NerderyAddVoteService', ['NerderyConstants'])
  .factory('AddVote', function ($q, $http, CONSTANTS) {
    return {
      getGames: function(gameId) {

        return $http.get(CONSTANTS.API_URL + 'addVote?callback=&apiKey=' + CONSTANTS.API_KEY + '&id=' + gameId)
          .then(function(response) {

            if(typeof response.data === 'object') {
              return true;
            } else {
              return $q.reject(response.data);
            }
          }, function(response) {
              return $q.reject(response.data);
          });
      }
    };
  });
