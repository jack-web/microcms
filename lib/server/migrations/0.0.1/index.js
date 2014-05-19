/*jslint node:true*/
'use strict';

var async = require('async'),
  _ = require('underscore'),
  account = require('../../models/account.js'),
  role = require('../../models/role.js');

exports.getInfo = function (cb) {
  cb(null, {
    version: '0.0.1',
    requiredVersion: '0.0.0'
  });
};

function createAccounts(cb) {
  async.parallel([
    _.bind(account.create, account, {login: 'admin', password: 'admin', hash: 'plain', title: 'Administrator'}),
    _.bind(account.create, account, {login: 'guest', password: 'guest', hash: 'plain', title: 'Guest'})
  ], cb);
}

function createRoles(cb) {
  async.parallel([
    _.bind(role.create, role, { title: 'Administrator'}),
    _.bind(role.create, role, { title: 'Guest'})
  ], cb);
}

exports.migrate = function (cb) {
  async.parallel([
    createAccounts,
    createRoles
  ], cb);
};