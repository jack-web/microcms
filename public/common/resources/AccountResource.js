(function(module){'use strict';
  module.factory('AccountResource', function($resource){
    console.log('factory start');
    return $resource('/api/accounts/:_id', {_id:'@_id'})
  });
})(angular.module('common.resources.AccountResource', [
  'ngResource'
]));