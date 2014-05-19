/*jslint node:true*/
'use strict';

var async = require('async'),
  _ = require('underscore'),
  role = require('../../models/role.js');

exports.getInfo = function (cb) {
  cb(null, {
    version: '1.0.0',
    requiredVersion: '0.0.3'
  });
};

exports.migrate = function (cb) {
  cb();
};