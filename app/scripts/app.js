(function() {
  'use strict';

  angular
    .module('xboxGameVotingApp', [
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngRoute',
      'API_MODULE',
      'ui.bootstrap'
    ])
    .config(function ($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'templates/main/mainTemplate.html',
        controller: 'MainCtrl'
      })
      .when('/wantedGames', {
        templateUrl: 'templates/wantedGames/wantedGamesTemplate.html',
        controller: 'WantedGamesCtrl'
      })
      .when('/ownedGames', {
        templateUrl: 'templates/ownedGames/ownedGamesTemplate.html',
        controller: 'OwnedGamesCtrl'
      })
      .when('/404', {
        templateUrl: '404.html',
      })
      .otherwise({
        redirectTo: '/404'
      });
    });
})();
