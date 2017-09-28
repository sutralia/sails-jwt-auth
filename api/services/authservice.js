var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var crypto = Promise.promisifyAll(require('crypto'));
var passport = require('passport');
var jwt = require('jsonwebtoken');
module.exports = {
  hashPassword: function(password) {
    return bcrypt.genSaltAsync(10)
      .then(function(salt) {
        return bcrypt.hashAsync(password, salt);
      });
  },
  comparePassword: function(password, hash) {
    return bcrypt.compareAsync(password, hash);
  },

  isAuthenticated: function(req, res, next) {
    console.log(req.url);
    var reqIp = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    
    passport.authenticate('jwt', function (error, payload, info) {
      if (error) return res.serverError(error);

      console.log(info);

      if (!payload) {
        if (info) {
          if (info.name == 'TokenExpiredError') {
            return res.jsonRes(401, {status: 401, message: "Authentication failed, authtoken expired, expiredAt: " + info.expiredAt + "."});
          } else {
            return res.jsonRes(401, {status: 401, message: "Authentication failed (" + info.message + ")"});
          }
        } else {
          return res.jsonRes(401, {status: 401, message: "Authentication failed (payload is not defined)"});
        }

      }

      Authtoken.findOne({appuser: payload.appuser, token:payload.authtoken, authType: 'jwt'})
      .populate('appuser')
      .then(function(authtoken) {
        console.log(authtoken);
        if (authtoken && authtoken.appuser) {
          var date = new Date();
          if (authtoken.expired > date) {
            req.authType = authtoken.authType;
            req.appuser = authtoken.appuser;
            req.user = authtoken.appuser;
            req.authtoken = authtoken;
            return next();
          } else {
            return res.jsonRes(401, {status: 401, message: "Authentication failed (authtoken expired)"});
          }
        } else {
          return res.jsonRes(401, {status: 401, message: "Authentication failed (invalid authtoken)"});
        }
      }, function(err) {
        return res.jsonRes(401, {status: 401, message: "Authentication failed (invalid authtoken)"});
      });
    })(req, res);
  },
};