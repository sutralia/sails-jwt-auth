module.exports = function sendApiError (error) {

  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  res.status(500);
  if (req.wantsJSON) {
    return res.jsonx({errcode: error.code, message:error.message});
  } else {
    if (error.cause.code == 403) {
        return res.forbidden(error.cause.error);
    } else if (error.cause.code == 404) {
        return res.notFound(error.cause.error);
    } if (error.cause.code == 401) {
        return res.badRequest(error.cause.error);
    } else {
        return res.serverError(error.cause.error);
    }
  }
};
