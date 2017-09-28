module.exports = function(req, res, next) {

  var pack = {
    params: req.params.all(),
    headers: req.headers,
    user: req.appuser
  };

  var promise = sails.bluebird.resolve(pack);
  req.promise = promise;
  next();
};
