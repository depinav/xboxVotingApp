'use strict';

angular.module('xboxGameVotingApp')
  .controller('WantedGamesCtrl', ['GetSpecificGames',
  function($scope, GetSpecificGames) {

    GetSpecificGames.getWantedGames().then(function(data) {

      $scope.gamesList = data;
      console.log(data);
    }, function(error) {
      console.log('Error: ', error);
    })
  }]);
