'use strict';

angular.module('nerd.directives.modal', [])
.directive('ngModal', function() {
  return {
    restrict: 'AE',
    scope: {
      show: '='
    },
    replace: true,
    transclude: true,
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if(attrs.width) {
        scope.dialogStyle.width = attrs.width;
      }
      if(attrs.height) {
        scope.dialogStyle.height = attrs.height;
      }
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    templateUrl: 'app/templates/common/directives/modal/modalTemplate.html'
  };
});
