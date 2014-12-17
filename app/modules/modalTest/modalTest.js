'use strict';

angular.module('ModalTest', [])
.controller('ModalTestController', function($scope) {
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
});
