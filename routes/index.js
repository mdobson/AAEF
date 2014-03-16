
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.firebase = function(req, res) {
  res.render('firebase', {title: 'Firebase App'})
};

exports.partials = function(req, res){
  var name = req.params.name;
  res.render('partials/'+name);
};
