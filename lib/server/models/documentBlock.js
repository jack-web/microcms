/**
 * Copyright (c) 2014 JackWeb. All rights reserved.
 *
 * documentBlock - microcms
 *
 */

/*jslint node:true*/
'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  createDate: { type: Date, required: true, default: Date.now },
  modifyDate: { type: Date },
  removed: { type: Date },
  document: {
    _id: {type: mongoose.Schema.Types.ObjectId, required: true},
    title: {type: String, required: true}
  },
  account: {
    _id: {type: mongoose.Schema.Types.ObjectId, required: true},
    title: {type: String, required: true}
  },
  type: {type: String, required: true, lowercase: true, trim: true},
  versions: [
    {
      version: {type: Number, required: true},
      data: {type: mongoose.Schema.Types.Mixed}
    }
  ]
}, {
  strict: true,
  safe: true,
  collection: 'documentBlocks'
});

schema.index({ 'document._id': 1, 'versions.version': 1 }, {unique: true});
module.exports = mongoose.model('DocumentBlock', schema);
