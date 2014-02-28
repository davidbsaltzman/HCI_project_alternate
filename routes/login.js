/*
 * GET login page.
 */

exports.view = function(req, res){
  console.log('clicked on login');
  res.render('login');
};