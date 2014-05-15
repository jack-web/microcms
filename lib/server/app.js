/*jslint node:true*/
'use strict';


var express = require('express');
var bunyan = require('bunyan');
var i18n = require('i18n-abide');
var _ = require('underscore');

var app = express();
var Account = require('./models/account.js');
var log = bunyan.createLogger({name: "microcms", type: 'app' });

app.disable('x-powered-by');

var responseTime = require('response-time');

app.use(responseTime());

app.use(require('body-parser')());

app.use(function (req, res, next) {
  req.getFields = function (denyFields) {
    var toLower = function (f) {
      return f.toLowerCase();
    };
    if (!denyFields) {
      denyFields = [];
    } else {
      denyFields = _.isArray(denyFields) ? _.map(denyFields, toLower) : [denyFields.toLowerCase()];
    }

    var fields = req.param('fields');
    if (fields && !_.isArray(fields)) {
      fields = [fields];
    }
    if (fields) {
      fields = _.reject(fields, function (f) {
        return !f.match(/^[a-z_][^\s,;]+$/i) || _.indexOf(denyFields, f.toLowerCase()) !== -1;
      });
    }
    if (!fields || fields.length === 0) {
      fields = _.map(denyFields, function (f) {
        return '-' + f;
      });
    }
    return fields.join(' ');
  };
  next();
});

/*app.use(function(req, res, next) {
 var start = Date.now();
 res.on('finish', function() {
 var duration = Date.now() - start;
 console.log(duration);
 });
 next();
 });*/
app.use(function (req, res, next) {
  req.log = log.child({type: 'app.request', req: {url: req.url, method: req.method, id: _.uniqueId('REQ')}});
  next();
});

/*
 var router = express.Router();

 router.get('/hello.json', function (req, res, next) {
 Account.findOne({'tickets.ticket': 'xxdx'}, 'login modifyDate __v tickets.$', function (err, model) {
 //var model = new Account ();
 //model.login = 'admin';
 //model.password = 'admin';
 //model.tickets.push({ticket:'xxdx'});
 model.increment();
 model.save(function (err) {
 if (err) return next(err);
 res.json(model);
 });
 });

 });*/
/*app.use(function(req, res, next)
 {
 setTimeout(next, 1000);
 });*/
app.use(i18n.abide({
  supported_languages: ['ru-RU', 'en-US'],
  default_lang: 'en-US',
  translation_directory: 'json'
}));
app.use('/api/accounts', require('./routes/accounts.js'));
app.use(express.static(__dirname + '../../../public'));
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/microcms');
var db = mongoose.connection;

var initDb = function (cb) {
  Account.findOne({login: 'admin'}, function (err, acc) {
    if (err) {
      return cb(err);
    }
    if (!acc) {
      acc = new Account({login: 'admin', password: 'admin', hash: 'plain', title: 'Administrator'});
      acc.save(cb);
    }
  });
};

db.on('error', function (err) {
  // Обрабатываем ошибку
  log.error(err);
});
db.on('open', function callback() {
  // Соединение прошло успешно
  log.info('mongodb connected');
  initDb(function (err) {
    if (err) {
      return log.error(err, 'Database init error');
    }
  });
});


var server = app.listen(30003, function () {
  log.info('Listening on port %d', server.address().port);
});
