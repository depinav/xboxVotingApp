'use strict';

angular.module('GamesList', ['API_MODULE', 'DIRECTIVES_MODULE'])
  .controller('GamesListController', function($scope, $log, GetGames) {
    $scope.gamesList = [];
    $scope.status = 'wantit';

    $scope.getGamesList = function() {
      GetGames.getGames().then(
      function(response){
        $scope.gamesList = response;
      },
      function(response) {
        $log.error('Service not called successfully: ', response);
      });
    };

    $scope.getGamesList();

    $scope.$on('GameModelChanged', function() {
      $scope.getGamesList();
    });
  })
  .controller('GamesListVoteController', function($scope, $log, AddVote) {

    $scope.vote = function(game) {
      AddVote.addVote(game.id).then(
      function() {
        alert('Done!');
        $scope.$emit('GameModelChanged', game);
      },
      function() {
        console.log('Service call failed.');
      });
    };

  });
