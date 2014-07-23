'use strict';

angular.module('xboxGameVotingApp')
  .controller('OwnedGamesCtrl', ['$scope', 'GetSpecificGames',
  function($scope, GetSpecificGames) {

    GetSpecificGames.getOwnedGames().then(function(data) {
      $scope.gamesList = data;
    }, function(error) {
      console.log('Error: ', error);
    })
  }]);
