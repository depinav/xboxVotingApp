'use strict';

angular.module('xboxGameVotingApp')
  .controller('OwnedGamesCtrl', function($scope, GetGames) {
    $scope.gamesList =  [];
    $scope.ownedGames = [];

    GetGames.getGames().then(function(response) {
      $scope.gamesList = response;

      angular.forEach($scope.gamesList, function(ownedGame) {
        if(ownedGame.status === 'gotit') {
          $scope.ownedGames.push(ownedGame);
        }
      });
    }, function(response) {
      console.log('Error: ', response);
    });

  });
