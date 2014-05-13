var mongoose = require('mongoose');
var ObjectID = mongoose.Schema.types.ObjectID;

var schema = new mongoose.Schema({
  createDate: { type: Date, required: true, default: Date.now() },
  modifyDate: { type: Date },
  removed: { type: Date },
  title: {type: String, required: true},
  fullTitle: {type: String},
  description: {type: String},
  account: {
    _id: {type: ObjectID, required: true},
    title: {type: String, required: true}
  },
  tags: [
    {
      title: {type: String}
    }
  ]
}, {
  strict: true,
  safe: true,
  collection: 'documents'
});

module.exports = mongoose.model('Document', schema);