'use strict';

angular.module('GamesList', ['API_MODULE'])
  .controller('GamesListController', ['$scope', '$log', 'GetGames',
  function($scope, $log, GetGames) {
    $scope.gamesList;
    $scope.status = 'wantit';

    $scope.getGamesList = function() {
      var games = [];
      GetGames.getGames().then(
      function(response){
        $scope.gamesList = response;
      },
      function(response) {
        $log.error('Service not called successfully: ', response)
      })
    }

    $scope.getGamesList();

    $scope.$on('GameModelChanged', function(event, args) {
      $scope.getGamesList();
    })
  }])
  .controller('GamesListVoteController', ['$scope', '$log', 'AddVote',
  function($scope, $log, AddVote) {

    $scope.vote = function(game) {
      AddVote.addVote(game.id).then(
      function(response) {
        alert('Done!');
        $scope.$emit('GameModelChanged', game);
      },
      function(response) {
        console.log('Service call failed.');
      });
    }

  }])
  .controller('AddGameModalCtrl', ['$scope', '$modal',
  function($scope, $modal) {

    $scope.open = function() {

      var modalInstance = $modal.open({
        templateUrl: 'templates/modal/addGameModalTemplate.html',
        controller: 'AddGameModalInstanceCtrl',
        size: 'sm'
      });

      modalInstance.result.then(function(game) {
        game.votes = 1;
        $scope.$emit('GameModelChanged', game);
      }, function() {
        console.log('Modal Dismissed, no service called');
      });
    };

  }])
  .controller('AddGameModalInstanceCtrl', ['$scope', '$modalInstance', 'AddGame',
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
