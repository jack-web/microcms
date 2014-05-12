(function (module) {'use strict';
  module.factory('accountRes', ['$resource', function ($resource) {
    return $resource('/api/accounts/:_id', {_id: '@_id'});
  }]);
})(angular.module('common.resources.accountRes', [
  'ngResource'
]));