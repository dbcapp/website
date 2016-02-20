'use strict';

const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../../../models/user');

module.exports = () => {
  passport.use('jwt-api', new JWTStrategy({
      secretOrKey: process.env.NODE_JWT_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeader(),
      audience: 'api'
    },
    (jwtPayload, done) => {
      UserModel.findOne({_id: jwtPayload._id})
        .exec()
        .then((user) => {
          done(null, user);
        })
        .catch(done);
    }
  ));
  console.log('Strategy loaded');
};
