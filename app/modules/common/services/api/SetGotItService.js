'use strict';

angular.module('NerderySetGotItService', ['NerderyConstants'])
  .factory('SetGotIt', function ($q, $http, CONSTANTS) {
    return {
      setGotIt: function(gameId) {
        var deferred = $q.defer();

        $http.jsonp(CONSTANTS.API_URL + 'setGotIt?callback=JSON_CALLBACK&apiKey=' + CONSTANTS.API_KEY + '&id=' + gameId)
          .then(function(response) {

            if(response.data === true) {
              deferred.resolve(response.data);
            } else {
              deferred.reject(response.data);
            }
          }, function(response) {
              deferred.reject(response.data);
          });

        return deferred.promise;
      }
    };
  });
