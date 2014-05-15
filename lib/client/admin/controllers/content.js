(function (module) {
  'use strict';

  var indexCtrl = function ($scope, accountRes) {
    accountRes.query().$promise.then(function (accs) {
      console.log(accs);
      $scope.page = 'Content';
    });
  };

  module.config(function ($routeProvider) {
    $routeProvider
      .when('/content', { templateUrl: 'partial1.html', controller: indexCtrl});
  });
}(angular.module('admin.controllers.content', [
  'common.resources.accountRes'
])));
