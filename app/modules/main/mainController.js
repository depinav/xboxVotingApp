'use strict';

angular.module('xboxGameVotingApp')
  .controller('NavCtrl', ['$scope', '$modal',
  function($scope, $modal, WantedGamesCtrl) {

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
        $log.warn('Service not called successfully.');
      });
    };
  }
  ])
  .controller('MainCtrl', ['$scope',
  function($scope) {
  }])
  .controller('AddGameModalCtrl', ['$scope', '$modalInstance', 'AddGame',
  function($scope, $modalInstance, AddGame) {
    $scope.game = {};

    $scope.save = function() {
      AddGame.addGame($scope.game.title).then(
      function(response) {
        $scope.game = response;
      },
      function(response) {
        console.log('Error: ', response);
      });

      $modalInstance.close($scope.game);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  }]);
