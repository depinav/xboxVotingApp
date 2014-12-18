'use strict';

angular.module('nerd.directives.alertModal', ['ui.bootstrap'])
.directive('ngAlertModal', function() {
  return {
    restrict: 'E',
    scope: {
      message: '='
    },
    replace: true,
    transclude: true,
    controller: function ($scope, $modal) {
      $modal.open({
        templateUrl: 'templates/common/directives/modal/alertModalInstanceTemplate.html',
        controller: 'AlertModalInstanceCtrl',
        size: 'sm',
      });
    }
  };
})
.controller('AlertModalInstanceCtrl', function($scope, $modalInstance) {
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
