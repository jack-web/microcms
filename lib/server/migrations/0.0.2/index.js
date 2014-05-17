/*jslint node:true*/
'use strict';

var async = require('async'),
  _ = require('underscore'),
  role = require('../../models/role.js');

exports.getInfo = function (cb) {
  cb(null, {
    version: '0.0.2',
    requiredVersion: '0.0.1'
  });
};

function createAccounts(cb) {
  async.parallel([
    _.partial(role.create, {title: 'Administrator'}),
    _.partial(role.create, {title: 'Guest'})
  ], cb);
}

exports.migrate = function (cb) {
  async.parallel([
    createAccounts
  ], cb);
};