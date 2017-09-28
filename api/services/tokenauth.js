var jwt = require('jsonwebtoken');

var tokenauth = {

  generateToken: function(payload,token) {
    console.log('token',token);
    console.log('payload',payload);
     return jwt.sign({
        appuser: payload.userId,
        authtoken: token
      },
      sails.config.jwt.secretOrKey,
      {
        algorithm: sails.config.jwt.algorithm,
        expiresIn: sails.config.jwt.expiresInMinutes * 60,
        issuer: sails.config.jwt.issuer,
        audience: sails.config.jwt.audience
      });
  },

  verifyToken: function(token, cb) {
    return jwt.verify(token, sails.config.jwt.secretOrKey, {}, cb);
  },

  getUser: function(token, cb) {
    tokenauth.verifyToken(token, function(err, data) {
      if(err) return cb(err);
      sails.models.user.findOne({id: data.userId}, function(err, User) {
        if(err) return cb(err);
        cb(null, User);
      });
    });
  }
};


module.exports = tokenauth;