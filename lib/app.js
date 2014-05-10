/**
 * Created by shestakov on 10.05.2014.
 */
var express = require('express');
var bunyan = require('bunyan');
var _ = require('underscore');


var app = express();
var Account = require('./models/Account.js');
var log = bunyan.createLogger({name: "microcms", type:'app' });

app.disable('x-powered-by');


/*app.use(function(req, res, next) {
  var start = Date.now();
  res.on('finish', function() {
    var duration = Date.now() - start;
    console.log(duration);
  });
  next();
});*/
app.use(function(req, res, next){
  req.log = log.child({type:'app.request', req:{url:req.url, method:req.method, id: _.uniqueId('REQ')}});
  next();
});
app.use(express.static(__dirname + '/../public'));
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
app.use('/api/accounts', require('./routes/accounts.js'));

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/microcms');
var db = mongoose.connection;

db.on('error', function (err) {
  // Обрабатываем ошибку
  log.error(err);
});
db.on('open', function callback() {
  // Соединение прошло успешно
  log.info('mongodb connected');
});


var server = app.listen(30003, function () {
  console.log('Listening on port %d', server.address().port);
});
