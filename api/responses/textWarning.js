module.exports = function sendApiWarning (error) {

  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  sails.log.silly('res.apiWarning() :: Sending', error);

  console.log(error);

  //res.status(error.cause.code);
  if (typeof error.cause != 'undefined' && typeof error.cause.code != 'undefined') {
  	res.status(error.cause.code);	
  } 
  
  res.set("content-type", "text/plain");
  return res.send(error.cause.error);
};
