'use strict';

angular.module('AddGameModalDirective', ['ui.bootstrap'])
  .controller('AddGameModalController', ['$scope',
  function($scope) {

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
  }])
  .controller('AddGameModalInstanceController', ['$scope', '$modalInstance', 'AddGame',
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
