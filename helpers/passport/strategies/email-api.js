'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../../../models/user');

module.exports = () => {
  passport.use('email-api', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) => {
      console.log(`Login Try: ${email}`);
      UserModel.findOne({email: email})
        .exec()
        .then((user) => {
          console.log(`User found: ${!!user}`);
          if (user && user.passwordMatch(password)) {
            done(null, user);
          } else {
            let err = new Error('Invalid email or password');
            err.status = 401;
            done(err);
          }
        })
        .catch(done);
    }
  ));
  console.log('Strategy loaded');
};
