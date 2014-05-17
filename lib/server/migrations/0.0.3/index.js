/*jslint node:true*/
'use strict';

var async = require('async'),
  _ = require('underscore'),
  role = require('../../models/role.js');

exports.getInfo = function (cb) {
  cb(null, {
    version: '0.0.3',
    requiredVersion: '0.0.2'
  });
};

exports.migrate = function (cb) {
 cb();
};