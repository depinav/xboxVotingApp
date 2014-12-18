'use strict';

angular.module('xboxGameVotingApp')
  .controller('WantedGamesCtrl', function($scope, $window, $modal, $log, GetGames,
                                          AddVote, SetGotIt, StorageService) {
    $scope.gamesList = [];
    $scope.wantedGames = [];
    $scope.ordered = 'votes';
    $scope.showModal = false;
    var day = new Date();

    if(StorageService.getStorage('voted') === null ||
      StorageService.getStorage('day') !== new Date().getDay()) {
      StorageService.setStorage('voted', false);
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
        $log.error('Error: ' + response);
      });
    };

    $scope.getGames();

    $scope.vote = function(game) {

      if(day.getDay() !== 6 && day.getDay() !== 0) {

        if(StorageService.getStorage('voted') !== 'true' ||
           StorageService.getStorage('day') !== new Date().getDay()) {

          StorageService.setStorage('voted', true);
          StorageService.setStorage('day', new Date().getDay());

          AddVote.addVote(game.id).then(
            function() {
              $window.alert('Done!');
              $scope.$emit('GameModelChanged', game);
            },
            function() {
              $log.error('Service call failed.');
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
            $log.error('Service call failed.');
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
            $log.warn('Modal Dismissed, no service called');
          });
        };

    $scope.$on('GameModelChanged', function() {
      $scope.getGames();
    });
  })
  .controller('AddGameModalInstanceCtrl', function($scope, $modalInstance, $window,
                                                   $log, AddGame, gamesList) {
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
              $log.error('Error: ', response);
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
