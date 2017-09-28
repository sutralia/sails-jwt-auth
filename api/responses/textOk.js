module.exports = function sendOK (pack) {

  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  //sails.log.silly('res.ok() :: Sending', pack.result.code, pack.result.data);
  sails.log.silly('res.textok() :: Sending');

  if (typeof pack.result != 'undefined' && typeof pack.result.code != 'undefined') {
  	res.status(pack.result.code);	
  }
  
  res.set("content-type", "text/plain");
  res.send(pack.result.data);

};
