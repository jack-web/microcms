(function (module) {'use strict';

  module.config(function ($routeProvider) {
    $routeProvider
      .when('/content', { templateUrl: 'partial1.html', controller: indexCtrl});
  });
  var indexCtrl = function ($scope, $http, accountRes) {
    accountRes.query().$promise.then(function(accs){
      console.log(accs);
      $scope.page='Content';
    });
  };
})(angular.module('admin.controllers.content',[
  'common.resources.accountRes'
]));
