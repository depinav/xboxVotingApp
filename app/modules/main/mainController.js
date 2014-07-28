'use strict';

angular.module('xboxGameVotingApp')
  .controller('NavCtrl', ['$scope', '$modal',
  function($scope, $modal) {

    $scope.category;
    $scope.collapsed = true;

    $scope.sortCategory = function(category) {
      $scope.category = category;
    }

    $scope.isActive = function(category) {
      return $scope.category === category;
    }

    $scope.open = function() {

      var modalInstance = $modal.open({
        templateUrl: 'templates/modal/addGameModalTemplate.html',
        controller: 'AddGameModalCtrl',
        size: 'sm'
      });

      modalInstance.result.then(function(game) {
        WantedGamesCtrl.gamesList.push(game)
      }, function() {
        console.log('Modal Dismissed, no service called');
      });
    };
  }
  ])
  .controller('MainCtrl', ['$scope',
  function($scope) {
  }]);
