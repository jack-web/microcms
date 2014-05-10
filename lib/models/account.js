/**
 * Created by shockk on 10.05.2014.
 *
 */

var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
  login: { type: String, required: true },
  createDate: { type: Date, required: true, default: Date.now() },
  modifyDate: { type: Date },
  activityDate: { type: Date },
  loginDate: { type: Date },
  password: {type: String, required: true},
  hash: {type: String, required: true, default: 'plain'},
  salt: {type: String},
  tickets: [
    {
      createDate: { type: Date, required: true, default: Date.now() },
      ticket: { type: String, required: true },
      persist: {type: Boolean, required: true, default: false}
    }
  ]
}, {
  strict: true,
  safe: true,
  collection: 'accounts'
});
AccountSchema.index({ login: 1 }, {unique: true});
AccountSchema.index({ 'tickets.ticket': 1 }, {unique: true});
module.exports = mongoose.model('Account', AccountSchema);