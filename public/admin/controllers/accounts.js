(function (module) {'use strict';

  module.config(function ($routeProvider) {
    $routeProvider
      .when('/accounts', { templateUrl: 'partial1.html', controller: indexCtrl});
  });
  var indexCtrl = function ($scope, $http, AccountResource) {
    AccountResource.query().$promise.then(function(accs){
      console.log(accs);
      $scope.page='Accounts';
    });
  }
})(angular.module('admin.controllers.accounts',[
  'common.resources.AccountResource'
]));
