'use strict';

exports.auth = (req, res, next) => {
  req.entities = {
    user: req.user
  };

  res.json({
    token: req.user.getToken(),
    user
  });
  res.end();
};

exports.unauthorized = (req, res, next) => {
  let err = new Error('Not authorized');
  err.status = 401;
  next(err);
};
