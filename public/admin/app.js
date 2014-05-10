(function (module) {
  module.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');
    $.ajaxSetup({ cache: false });
  });
})(angular.module('app', [
  'ngRoute',
  'admin.controllers.accounts',
  'admin.controllers.content'
]));
