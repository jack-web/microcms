/*jslint browser:true*/

(function (angular) {
  'use strict';

  var module = angular.module('common.resources.documentRes', ['ngResource']);

  module.factory('documentRes', ['$resource', function ($resource) {
    return $resource('/api/documents/:_id', {
      _id: '@_id'
    });
  }]);
}(window.angular));