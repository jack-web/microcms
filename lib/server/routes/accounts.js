/**
 * Created by shockk on 10.05.2014.
 */

var express = require('express');
var _ = require('underscore');
var Account = require('../models/account.js');

var router = express.Router();

router.get('/', function (req, res, next) {
  Account.find({}, req.getFields(['password']), function (err, accs) {
    if (err) return next(err);
    res.json(accs);
  });
});

module.exports = router;