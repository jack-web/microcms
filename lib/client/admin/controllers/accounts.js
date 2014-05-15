(function (angular) {
  'use strict';

  var module = angular.module('admin.controllers.accounts', ['common.resources.accountRes']);

  var indexCtrl = function ($scope, model, gettextCatalog) {
    $scope.model = model;
    console.log(model);
    gettextCatalog.currentLanguage = 'ru_RU';
    gettextCatalog.debug = true;
  };
  indexCtrl.resolve = {
    model: function (accountRes) {
      return accountRes.query({fields: ['login', 'createDate']}).$promise;
    }
  };

  module.config(function ($routeProvider) {
    $routeProvider
      .when('/accounts', { templateUrl: '/admin/templates/accounts/index.html', controller: indexCtrl, resolve: indexCtrl.resolve});
  });
}(window.angular));
