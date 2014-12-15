'use strict';

angular.module('xboxGameVotingApp')
  .controller('WantedGamesCtrl', function($scope, $window, $modal, GetGames, AddVote, SetGotIt) {
    $scope.gamesList = [];
    $scope.wantedGames = [];
    $scope.ordered = 'votes';
    $scope.showModal = false;
    var day = new Date();


    if(typeof(Storage) !== undefined) {
      if(localStorage.getItem('voted') === null || localStorage.getItem('day') !== new Date().getDay()) {
        localStorage.setItem('voted', false);
      }
    } else {
      console.log('Couldn\'t do it');
    }

    $scope.getGames = function() {
      GetGames.getGames().then(function(response) {
        $scope.gamesList = response;

        $scope.wantedGames = [];
        angular.forEach($scope.gamesList, function(wantedGame) {
          if(wantedGame.status === 'wantit') {
            $scope.wantedGames.push(wantedGame);
          }
        });
      }, function(response) {
        console.log('Error: ', response);
      });
    };

    $scope.getGames();

    $scope.vote = function(game) {

      if(day.getDay() !== 6 && day.getDay() !== 0) {

        if(localStorage.getItem('voted') !== true || localStorage.getItem('day') !== new Date().getDay()) {

          localStorage.setItem('voted', true);
          localStorage.setItem('day', new Date().getDay());
          console.log(localStorage.getItem('day'));
          AddVote.addVote(game.id).then(
            function() {
              $window.alert('Done!');
              $scope.$emit('GameModelChanged', game);
            },
            function() {
              console.log('Service call failed.');
            });
          } else {
            $window.alert('Already voted today. Try again tomorrow.');
          }
        } else {
          $window.alert('Voting closed on Saturday and Sunday.');
        }
      };

      $scope.owned = function(game) {
        SetGotIt.setGotIt(game.id).then(
          function() {
            $window.alert('Game set to owned');
            $scope.$emit('GameModelChanged', game);
          },
          function() {
            console.log('Service call failed.');
          });
        };

        $scope.open = function() {
          var modalInstance = $modal.open({
            templateUrl: 'templates/modal/addGameModalTemplate.html',
            controller: 'AddGameModalInstanceCtrl',
            size: 'sm',
            resolve: {
              gamesList: function() {return $scope.gamesList;}
            }
          });

          modalInstance.result.then(function(game) {
            $scope.$emit('GameModelChanged', game);
          }, function() {
            console.log('Modal Dismissed, no service called');
          });
        };

    $scope.$on('GameModelChanged', function() {
      $scope.getGames();
    });
  })
  .controller('AddGameModalInstanceCtrl', function($scope, $modalInstance, $window, AddGame, gamesList) {
    $scope.game = {};
    $scope.inArray = false;

    $scope.save = function() {
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

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };

      });
