/**
 * Created by shockk on 10.05.2014.
 */

var express = require('express');
var Account = require('../models/Account.js');

var router = express.Router();

router.get('/', function(req, res, next){
  req.log.info('accounts list begin');
  Account.find({}, '-password -hash -tickets', function (err, accs) {
    if (err) return next(err);
    req.log.info('accounts list end');
    res.json(accs);
  });
});

module.exports = router;