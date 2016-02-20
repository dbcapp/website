'use strict';

const passport = require('passport');
const glob = require('glob-promise');

module.exports = () => {
  // Serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Deserialize sessions
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  console.log('Loading strategies');
  require('./strategies/email-api')();
  require('./strategies/jwt-api')();
};

module.exports.authenticate = (strategy) => passport.authenticate(strategy, {
  session: false,
  failureRedirect: '/0.1/auth/unauthorized'
});
