'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const crypt = require('../helpers/crypt');
const schema = require('./schemas/user');
const jwt = require('../helpers/jwt');

schema.methods.passwordMatch = function(password) {
  return crypt.compare(password, this.password);
};

schema.methods.getToken = function() {
  let tokenData = _.pick(this.toObject(), '_id');
  tokenData.aud = 'api';
  return jwt.generate(tokenData);
};

const Model = mongoose.model('User', schema);

module.exports = Model;
