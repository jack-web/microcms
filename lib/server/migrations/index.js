/*jslint node:true*/
'use strict';

var async = require('async'),
  fs = require('fs'),
  path = require('path'),
  _ = require('underscore'),
  version = require('../models/version.js');

function getVersionInt(str) {
  var versionParts = str.split('.');
  if (versionParts.length > 3) {
    versionParts = _.first(versionParts, 3);
  }
  while (versionParts.length < 3) {
    versionParts.push('0');
  }
  versionParts = _.map(versionParts, function (c) {
    return parseInt(c, 10);
  });
  return (versionParts[0] << 16) +
    (versionParts[1] << 8) +
    (versionParts[2] << 0);
}

function getVersion(cb) {
  version.find({}, 'version', {sort: {version: -1}, limit: 1}, function (err, versions) {
    if (err) return cb(err);
    if (versions.length == 0) {
      version.create({version: '0.0.0', description: 'Clean database'}, function (err, version) {
        if (err) return cb(err);
        return cb(null, version.version);
      });
    } else {
      return cb(null, versions[0].version);
    }
  });
}

function getMigrations(cb) {
  fs.readdir(__dirname, function (err, res) {
    if (err) return cb(err);
    async.filter(res, function (name, next) {
      fs.stat(path.join(__dirname, name), function (err, stat) {
        next(err || stat.isDirectory());
      });
    }, function (res) {
      var names = _.map(res, function (name) {
        return path.join(__dirname, name, 'index.js');
      });
      async.filter(names, fs.exists, function (results) {
        async.map(_.map(results, require), function (migration, next) {
          migration.getInfo(function (err, info) {
            if (err) return next(err);
            return next(null, {version: info.version, intVersion: getVersionInt(info.version), requiredVersion: info.requiredVersion, migrate: migration.migrate});
          });
        }, cb);
      });
    });
  });
}

function buildMigrationPath(data, cb) {
  var build = function (path, step) {
    var last = _.last(path);
    last.step = step;
    if (last.version != data.version) {
      var prevVersion = _.findWhere(data.migrations, {version: last.requiredVersion});
      if (prevVersion) {
        path.push(prevVersion);
        build(path, step + 1);
      }
    }
  };
  var maxMigration = _.max(data.migrations, function (m) {
    return m.intVersion;
  });
  var path = [maxMigration];
  build(path, 0);
  var cleanPath = _.map(_.sortBy(path, function (i) {
    return -1 * i.step;
  }), function (i) {
    return _.omit(i, ['step']);
  });
  cb(null, cleanPath);
}

exports.migrateToActual = function (cb) {
  async.waterfall([
    function (next) {
      async.parallel({version: getVersion, migrations: getMigrations}, next)
    },
    buildMigrationPath,
    function (path, next) {
      console.log(path);
      next();
    }], cb)
};


/*
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
 };*/
