'use strict';

const _ = require('lodash');
const UserModel = require('../../models/user');

exports.user = (req, res, next) => {
  let data = _.pick(req.body, 'name', 'email', 'password');

  data.type = 'User';

  let user = new UserModel(data);

  user.save()
    .then(() => {
      res.json({created: true});
      res.end();
    });
};

exports.organization = (req, res, next) => {
  let data = _.pick(req.body, 'name', 'email', 'password');

  data.type = 'Organization';

  let user = new UserModel(data);

  user.save()
    .then(() => {
      res.json({created: true});
      res.end();
    });
};
