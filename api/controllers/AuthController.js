/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function(req, res) {

    var email = req.param('email');
    var password = req.param('password');

    // delay everthing to prevent bruteforce, dos and timing attacks
    setTimeout(function() {
      if(!email || !password) {
        return res.json(401, {err: 'email and password required'});
      }

      sails.models.user.findOne({email: email}, function(err, User) {
        if(!User) {
          return res.json(401, {err: 'invalid email or password'});
        }

        User.verifyPassword(password, function(err, valid) {
          if(err) {
            return res.json(403, {err: 'forbidden'});
          }

          if(!valid) {
            return res.json(401, {err: 'invalid email or password'});
          } else {
            res.json({user: User, token: sails.services.tokenauth.generateToken({userId: User.id})});

            // register in socket if this is a socket-request
            if(req.isSocket) {
              req.socket.User = User;
            }
          }
        });
      });
    }, 200);
  },


  register: function(req, res){
    var email = req.param('email');
    var password = req.param('password');
    var name = req.param('name');
    var username = req.param('username');

    // delay everthing to prevent bruteforce, dos and timing attacks
    setTimeout(function() {
      if(!email || !password) {
        return res.json(401, {
          err: 'email and password required'
        });
      }

      sails.models.user.create({
        email: email,
        password:password,
        username:username,
        name:name,
      }, 
      function(err, User) {
        console.log(err);
        if(!User) {
          return res.json(401, {err: 'invalid email or password'});
        }
        else{
          res.json({
            user: User,
            token: sails.services.tokenauth.generateToken({
              userId: User.id,  
            })
          });
        }

       
      });
    }, 200);
  },


  /**
   * attach the User to the socket using a token
   * (socket.io reconnect)
   * @param req
   * @param res
   * @returns {*}
   */
  authSocket: function(req, res) {
    if(!req.isSocket) {
      return res.json(400, 'This route is for socket connections only');
    }

    var token = req.param('token');
    if(!token) return res.json(401, 'token missing');

    sails.services.tokenauth.getUser(token, function(err, User) {
      if(err || !User) {
        return res.json(401, 'token invalid');
      }
      req.socket.User = User;
      res.json(200, User.toJSON());
    });
  },

  /**
   * "logout" for sockets
   * @param req
   * @param res
   * @returns {*}
   */
  deauthSocket: function(req, res) {
    if(!req.isSocket) {
      return res.json(400, 'This route is for socket connections only');
    }

    delete req.socket.User;
    res.json(200, 'ok');
  }
};

