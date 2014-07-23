'use strict';

angular.module('GetSpecificGamesService', ['NerderyGetGamesService'])
  .factory('GetSpecificGames', function($scope, GetGames) {
    return {

      getOwnedGames: function() {
        GetGames.getGames().then(function(data) {
          $scope.ownedGamesList;

          angular.forEach(data, function(game) {
            if (game.status === 'gotit') {
              $scope.ownedGamesList.push(game);
            }
          });
        })
      },
      getWantedGames: function() {
        GetGames.getGames().then(function(data) {
          $scope.ownedGamesList;

          angular.forEach(data, function(game) {
            if (game.status === 'wantit') {
              $scope.ownedGamesList.push(game);
            }
          });
        })
      }
    }
  });
