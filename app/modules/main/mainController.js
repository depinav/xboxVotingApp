'use strict';

angular.module('xboxGameVotingApp')
  .controller('NavCtrl', ['$scope',
  function($scope) {

    $scope.category;

    $scope.sortCategory = function(category) {
      $scope.category = category;
    }

    $scope.isActive = function(category) {
      return $scope.category === category;
    }
  }
])
  .controller('MainCtrl', ['$scope', 
  function($scope) {
  }]);
