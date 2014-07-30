'use strict';

angular.module('xboxGameVotingApp')
  .controller('NavCtrl', ['$scope', '$modal',
  function($scope, $modal) {

    $scope.category;
    $scope.collapsed = true;

    $scope.sortCategory = function(category) {
      $scope.category = category;
    }

    $scope.isActive = function(category) {
      return $scope.category === category;
    }

    $scope.collapse = function(navCollapsed) {
      $scope.collapsed = navCollapsed;
    }
  }])
  .controller('MainCtrl', ['$scope',
  function($scope) {
  }]);
