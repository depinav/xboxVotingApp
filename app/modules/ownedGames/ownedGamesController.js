'use strict';

angular.module('xboxGameVotingApp')
  .controller('OwnedGamesCtrl', ['$scope', 'GetSpecificGames',
  function($scope, GetSpecificGames) {
    $scope.gamesList;

    GetSpecificGames.getOwnedGames().then(function(response) {
      $scope.gamesList = response;
    }, function(response) {
      console.log('Error: ', response);
    });

  }]);
