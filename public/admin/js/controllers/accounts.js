(function (module) {

  module.config(function ($routeProvider) {
    $routeProvider
      .when('/accounts', { templateUrl: '/admin/templates/accounts/index.html', controller: indexCtrl});
  });
  var indexCtrl = function ($scope, $http) {
  }
})(angular.module('app'));
