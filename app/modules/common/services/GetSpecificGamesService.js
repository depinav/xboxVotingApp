'use strict';

angular.module('GetSpecificGamesService', ['NerderyGetGamesService'])
  .factory('GetSpecificGames', function($q, GetGames) {
    return {

      getWantedGames: function() {
        var deferred = $q.defer();
        var gamesList = [];

        GetGames.getGames().then(
        function(response) {
          angular.forEach(response, function(game) {
            gamesList.push(game);
          });

          deferred.resolve(gamesList);
        },
        function(response) {
          console.log('Error: ', error);
        });
        return deferred.promise;
      }
    };
  });
