'use strict';

angular.module('stayInTouchApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('contacts', {
        url: '/',
        template: '<contacts></contacts>'
      });
  });
