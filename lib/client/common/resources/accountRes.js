/*global window*/

(function (angular) {
  'use strict';

  var module = angular.module('common.resources.accountRes', ['ngResource']);

  module.factory('accountRes', ['$resource', function ($resource) {
    return $resource('/api/accounts/:_id', {
      _id: '@_id'
    });
  }]);
}(window.angular));