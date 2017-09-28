/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  schema: false,
  connection:'store',
  labels: {
    name: {
      title: "Name"
    },
    email: {
      title: "E-Mail"
    },
    password: {
      title: "Passwort"
    },
    isAdmin: {
      title: 'Administrator'
    }
  },

  types: {
    password: function(password) {
      return password === this.passwordConfirm;
    }
  },

  attributes: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      email: true,
      minLength: 3
    },
    password: {
      type: 'string',
      // password: true,
      minLength: 8,
      required: true
    },
    isAdmin: {
      type: 'boolean'
    },
    username:{
      type:'string'
    },



      // Alter JSON response
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    },

    verifyPassword: function(password, cb) {
      return bcrypt.compare(password, this.password, cb);
    }

  },


   beforeCreate: function (values, next) {
    console.log("before create");
    authservice.hashPassword(values.password)
      .then(function (hash) {
        values.password = hash;
        next();
      }, function (err) {
        next(err);
      });
  },

  beforeUpdate: function(data, cb) {
    if(data.password) {
      bcrypt.hash(data.password, function(err, hash) {
        data.password = hash;
        delete data.passwordConfirm;
        cb();
      });
    } else {
      return cb();
    }
  },

  getMyProfile: function(pack){
    console.log(pack);
    return sails.models.user.findOne({
      id:pack.user.id
    })
    .then(function(doUser){
      if(doUser){
        pack.result={
          code:200,
          data:doUser
        };
      }
      else{
        throw new sails.bluebird,OperationalError({
          code:400,
          error:'eroor'
        });
      }
      return pack;
    });
  }

};

