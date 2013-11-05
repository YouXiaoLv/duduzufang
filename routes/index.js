var HouseProvider = require('../db/HouseProvider.js').HouseProvider;

/*
 * GET home page.
 */

exports.index = function(req, res){
  HouseProvider.findAll(function(error, houses) {
    res.render('index', {
      title: '首页',
      houses: houses
    });
  });
};
