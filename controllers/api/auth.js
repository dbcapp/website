'use strict';

const _ = require('lodash');

exports.auth = (req, res, next) => {
  res.json({
    token: req.user.getToken(),
    user: _.omit(req.user, 'password')
  });
  res.end();
};

exports.unauthorized = (req, res, next) => {
  let err = new Error('Not authorized');
  err.status = 401;
  next(err);
};
