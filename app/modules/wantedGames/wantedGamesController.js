'use strict';

angular.module('xboxGameVotingApp')
  .controller('WantedGamesCtrl', ['$scope', 'GetSpecificGames', 'AddVote', 'SetGotIt',
  function($scope, GetSpecificGames, AddVote, SetGotIt) {
    $scope.gamesList = [];
    $scope.ordered = 'votes';

    $scope.getGames = function() {
      GetSpecificGames.getWantedGames().then(function(response) {
        $scope.gamesList = response;
      }, function(response) {
        console.log('Error: ', response);
      });
    }

    $scope.getGames();

    $scope.$on('GameModelChanged', function(event, args) {
      $scope.getGames();
    })
  }])
  .controller('VoteForGameCtrl', ['$scope', 'AddVote',
  function($scope, AddVote) {
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
  .controller('SetOwnedGameCtrl', ['$scope', 'SetGotIt',
  function($scope, SetGotIt) {
    $scope.owned = function(game) {
      SetGotIt.setGotIt(game.id).then(
      function(response) {
        alert('Game set to owned');
        $scope.$emit('GameModelChanged', game);
      },
      function(respons) {
        console.log('Service call failed.')
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
      console.log($scope.gamesList);
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
