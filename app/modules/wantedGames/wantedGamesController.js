'use strict';

angular.module('xboxGameVotingApp')
  .controller('WantedGamesCtrl', ['$scope', 'GetSpecificGames',
  function($scope, GetSpecificGames) {
    $scope.gamesList = [];

    GetSpecificGames.getWantedGames().then(function(response) {
      $scope.gamesList = response;
    }, function(response) {
      console.log('Error: ', response);
    });
  }]);
