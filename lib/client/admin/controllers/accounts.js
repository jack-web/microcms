(function (angular) {
  'use strict';

  var module = angular.module('admin.controllers.accounts', ['common.resources.accountRes']);

  module.config(function ($routeProvider) {
    $routeProvider
      .when('/accounts', { templateUrl: '/admin/templates/accounts/index.html', controller: indexCtrl, resolve: indexCtrl.resolve});
  });

  var indexCtrl = function ($scope, model) {
    $scope.model = model;
    console.log(model);
  };
  indexCtrl.resolve = {
    model: function (accountRes) {
      return accountRes.query({fields: ['login', 'createDate']}).$promise;
    }
  };
}(window.angular));
