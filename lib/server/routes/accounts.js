/*jslint node:true*/

(function () {
  'use strict';
  var express = require('express'),
    Account = require('../models/account.js'),
    router = express.Router();

  router.get('/', function (req, res, next) {
    Account.find({}, req.getFields(['password']), function (err, accs) {
      if (err) {
        return next(err);
      }
      console.log(req.gettext('Administrator'));
      res.json(accs);
    });
  });

  module.exports = router;
}());
