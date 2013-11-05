/*
 * House utils.
 */

exports.add = function(req, res){
  res.render('house_add', {
    title: '添加房源信息'
  });
};

