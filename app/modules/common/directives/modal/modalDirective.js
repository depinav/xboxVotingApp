'use strict';

angular.module('nerd.directives.modal', ['ui.bootstrap', 'API_MODULE'])
.directive('ngModal', function() {
  return {
    restrict: 'AE',
    scope: {
      games: '='
    },
    replace: true,
    transclude: true,
    controller: function ($scope, $modal) {
      $scope.open = function () {
        var modalInstance = $modal.open({
          templateUrl: 'templates/common/directives/modal/modalInstanceTemplate.html',
          controller: 'AddGameModalInstanceCtrl',
          size: 'sm',
          resolve: {
            gamesList: function () {return $scope.games;}
          }
        });

        modalInstance.result.then(function(game) {
          $scope.$emit('GameModelChanged', game);
        }, function () {
          console.log('Modal Dismissed, no service called');
        });
      };
    },
    templateUrl: 'templates/common/directives/modal/modalTemplate.html'
  };
})
.controller('AddGameModalInstanceCtrl', function($scope, $modalInstance, $window, AddGame, gamesList) {
  $scope.game = {};
  $scope.inArray = false;

  $scope.save = function () {
    angular.forEach(gamesList, function(gameCheck) {
      if(gameCheck.title === $scope.game.title){
        $scope.inArray = true;
      }
    });

    if(!$scope.inArray) {
      AddGame.addGame($scope.game.title).then(
        function(response) {
          $scope.game = response;
        },
        function(response) {
          console.log('Error: ', response);
        });
      } else {
        $window.alert('Game already added to list. Check "Owned Games" page.');
      }

      $modalInstance.close($scope.game);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
