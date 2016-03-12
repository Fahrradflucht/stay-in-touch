'use strict';

angular.module('stayInTouchApp.auth', [
  'stayInTouchApp.constants',
  'stayInTouchApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
