/*jslint node:true*/
'use strict';

var async = require('async'),
  _ = require('underscore'),
  account = require('../../models/account.js');

exports.getInfo = function (cb) {
  cb(null, {
    version: '0.0.1',
    requiredVersion: '0.0.0'
  });
};

function createAccounts(cb) {
  async.parallel([
    _.partial(account.create, {login: 'admin', password: 'admin', hash: 'plain', title: 'Administrator'}),
    _.partial(account.create, {login: 'guest', password: 'guest', hash: 'plain', title: 'Guest'})
  ], cb);
}

exports.migrate = function (cb) {
  async.parallel([
    createAccounts
  ], cb);
};