'use strict';

angular.module('xboxGameVotingApp')
  .controller('WantedGamesCtrl', ['$scope', '$cookieStore', 'GetGames', 'AddVote', 'SetGotIt',
  function($scope, $cookieStore, GetGames, AddVote, SetGotIt) {
    $scope.gamesList = [];
    $scope.wantedGames = [];
    $scope.ordered = 'votes';


    if(typeof(Storage) != undefined) {
      if(localStorage.getItem('voted') === null && localStorage.getItem('day') !== new Date().getDay())
        localStorage.setItem('voted', false);
    } else {
      console.log('Couldn\'t do it');
    }

    $scope.getGames = function() {
      GetGames.getGames().then(function(response) {
        $scope.gamesList = response;

        $scope.wantedGames = [];
        angular.forEach($scope.gamesList, function(wantedGame) {
          if(wantedGame.status === 'wantit')
            $scope.wantedGames.push(wantedGame);
        });
      }, function(response) {
        console.log('Error: ', response);
      });
    }

    $scope.getGames();

    $scope.$on('GameModelChanged', function(event, args) {
      $scope.getGames();
    })
  }])
  .controller('VoteForGameCtrl', ['$scope', '$cookieStore', 'AddVote',
  function($scope, $cookieStore, AddVote) {
    var day = new Date();

    $scope.vote = function(game) {

      if(day.getDay() !== 6 && day.getDay() !== 0) {

        if($cookieStore.get('voted') !== true) {

          $cookieStore.put('voted', true);
          $cookieStore.put('day', new Date().getDay());
          console.log($cookieStore.get('day'));
          AddVote.addVote(game.id).then(
          function(response) {
            alert('Done!');
            $scope.$emit('GameModelChanged', game);
          },
          function(response) {
             console.log('Service call failed.');
          });
        } else {
          alert('Already voted today. Try again tomorrow.');
        }
      } else {
        alert('Voting closed on Saturday and Sunday.');
      }
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
        size: 'sm',
        resolve: {
          gamesList: function() {return $scope.gamesList}
        }
      });

      modalInstance.result.then(function(game) {
        $scope.$emit('GameModelChanged', game);
      }, function() {
        console.log('Modal Dismissed, no service called');
      });
    };

  }])
  .controller('AddGameModalInstanceCtrl', ['$scope', '$modalInstance', 'AddGame', 'gamesList',
  function($scope, $modalInstance, AddGame, gamesList) {
    $scope.game = {};
    $scope.inArray = false;

    $scope.save = function() {
      angular.forEach(gamesList, function(gameCheck) {
        if(gameCheck.title === $scope.game.title)
          $scope.inArray = true;
      });

      if(!$scope.inArray) {
        AddGame.addGame($scope.game.title).then(
        function(response) {
          $scope.game = response;
        },
        function(response) {
          console.log('Error: ', response);
        });
      }

      $modalInstance.close($scope.game);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  }]);
