module.exports = function sendApiWarning (error) {

  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  sails.log.silly('res.apiWarning() :: Sending', error);

  res.status(error.cause.code);
  //res.send(error.cause.error);
  //res.status(200);

  if (req.wantsJSON) {
    return res.jsonx(error.cause.error);
  }
};
