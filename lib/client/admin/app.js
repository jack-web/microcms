(function (angular, $) {
  'use strict';
  var module = angular.module('app', [
    'ngRoute',
    'gettext',
    'admin.controllers.accounts',
    'admin.controllers.content'
  ]);
  module.config(function ($locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');
    $.ajaxSetup({ cache: false });
  });
}(window.angular, window.jQuery));
