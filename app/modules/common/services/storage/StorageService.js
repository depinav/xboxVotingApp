'use strict';

angular.module('nerd.services.storage', ['LocalStorageModule'])
.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
  .setPrefix('xboxVoting')
  .setNotify(true, true);
})
.factory('StorageService', function(localStorageService) {
  return {

    setStorage: function (key, val) {
      localStorageService.set(key, val);
    },

    getStorage: function (key) {
      return localStorageService.get(key);
    }
  };
});
