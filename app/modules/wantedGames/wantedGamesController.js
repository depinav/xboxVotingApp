'use strict';

angular.module('xboxGameVotingApp')
  .controller('WantedGamesCtrl', function($scope, $window, $modal, GetGames,
                                          AddVote, SetGotIt) {
    $scope.gamesList = [];
    $scope.wantedGames = [];
    $scope.ordered = 'votes';
    $scope.showModal = false;
    var day = new Date();

    $scope.getGames = function () {
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
            function () {
              $window.alert('Done!');
              $scope.$emit('GameModelChanged', game);
            },
            function () {
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
        function () {
          $window.alert('Game set to owned');
          $scope.$emit('GameModelChanged', game);
        },
        function () {
          console.log('Service call failed.');
        });
      };

        $scope.open = function () {
          var modalInstance = $modal.open({
            templateUrl: 'templates/modal/addGameModalTemplate.html',
            controller: 'AddGameModalInstanceCtrl',
            size: 'sm',
            resolve: {
              gamesList: function () {return $scope.gamesList;}
            }
          });

          modalInstance.result.then(function(game) {
            $scope.$emit('GameModelChanged', game);
          }, function () {
            console.log('Modal Dismissed, no service called');
          });
        };

    $scope.$on('GameModelChanged', function () {
      $scope.getGames();
    });
  });
