'use strict';

exports.auth = (req, res, next) => {
  res.json({
    token: req.user.getToken(),
    user: req.user
  });
  res.end();
};

exports.unauthorized = (req, res, next) => {
  let err = new Error('Not authorized');
  err.status = 401;
  next(err);
};
