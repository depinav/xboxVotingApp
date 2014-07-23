'use strict';

angular.module('xboxGameVotingApp')
  .controller('MainCtrl', ['$scope', 'GetGames',
  function($scope, GetGames) {

    $scope.category;

    /*$scope.getGames = function() {
      GetGames.getGames().then(function(data) {
      $scope.nerdery.gamesList = data;
      }, function(error) {
      console.log('Error: ', error)
      });
    }*/

    $scope.sortCategory = function(category) {
      $scope.category = category;
    }

    $scope.isActive = function(category) {
      return $scope.category === category;
    }
  }
]);
