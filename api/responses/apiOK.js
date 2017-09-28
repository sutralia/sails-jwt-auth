module.exports = function sendOK (pack) {

  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  //sails.log.silly('res.ok() :: Sending', pack.result.code, pack.result.data);
  sails.log.silly('res.ok() :: Sending');

  res.status(pack.result.code);

  if (req.wantsJSON) {
	return res.jsonx(pack.result.data);
  } else {
	return res.jsonx(pack.result.data);
  }
};
