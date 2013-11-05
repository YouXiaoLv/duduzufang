/*
 * The house datatype:
 * {
 *   _id: 0,
 *   title: '',
 *   price: 0,
 *   url: '',
 *   created_at: new Date()
 * }
 */

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var HouseProvider = function (host, port) {
  this.db = new Db('node-mongo-house', new Server(host, port, {
    safe: false
  }, {
    auto_reconnect: true
  }, {}));
  this.db.open(function () {});
};


HouseProvider.prototype.getCollection = function (callback) {
  this.db.collection('houses', function (error, collection) {
    if (error) {
      callback(error);
    } else {
      callback(null, collection);
    }
  });
};

//find all houses
HouseProvider.prototype.findAll = function (callback) {
  this.getCollection(function (error, collection) {
    if (error) {
      callback(error);
    } else {
      collection.find().toArray(function (error, results) {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      });
    }
  });
};

//save new house
HouseProvider.prototype.save = function (houses, callback) {
  this.getCollection(function (error, collection) {
    if (error) {
      callback(error)
    } else {
      if (typeof (houses.length) == "undefined")
        houses = [houses];

      for (var i = 0; i < houses.length; i++) {
        var house = houses[i];
        house.created_at = new Date();
      }

      collection.insert(houses, function () {
        callback(null, houses);
      });
    }
  });
};

exports.HouseProvider = new HouseProvider('localhost', 27017);
