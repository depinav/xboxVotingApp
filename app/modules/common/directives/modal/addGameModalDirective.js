'use strict'

angular.module('AddGameModalDirective')
  .directive('AddGameModal', function() {
    return {
      restrict: 'A',
      scope: {
        game: '=ngModel'
      },
      templateUrl: 'template/addGameModalTemplate.js',
      controller: 'AddGameModalController'
    };
  });
