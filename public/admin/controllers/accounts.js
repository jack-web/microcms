(function (module) {'use strict';

  module.config(function ($routeProvider) {
    $routeProvider
      .when('/accounts', { templateUrl: '/admin/templates/accounts/index.html', controller: indexCtrl});
  });
  var indexCtrl = function ($scope, $http, accountRes) {
    accountRes.query({fields:['login', 'createDate']}).$promise.then(function(accs){
      $scope.model=accs;
    });
  };
})(angular.module('admin.controllers.accounts',[
  'common.resources.accountRes'
]));
