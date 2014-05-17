/*jslint node:true*/
'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: { type: String, required: true },
  createDate: { type: Date, required: true, default: Date.now },
  modifyDate: { type: Date },
  removed: { type: Date }
}, {
  strict: true,
  safe: true,
  collection: 'roles'
});

module.exports = mongoose.model('Role', schema);