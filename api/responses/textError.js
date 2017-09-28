module.exports = function sendApiError (error) {

  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  console.log(error);

  if (typeof error.code != 'undefined' ) {
    res.send(error.cause.code);
  } else {
    res.status(500);
  }
   
  res.set("content-type", "text/plain");
  return res.send(error.message);
};
