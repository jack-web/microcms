(function (module) {
  'use strict';
  module.config(function ($locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');
    $.ajaxSetup({ cache: false });
  });
}(angular.module('app', [
  'ngRoute',
  'gettext',
  'admin.controllers.accounts',
  'admin.controllers.content'
])));
