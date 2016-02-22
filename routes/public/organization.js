'use strict';

const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const _ = require('lodash');

router.get('/:id', (req, res) => {
  let id = req.params.id;
  let bj = {};
  let user = req.session.user;
  let user_id = (user)? user._id : null;

  User.findOne({_id: id})
    .exec()
    .then((org) => {
      org = _.omit(org.toObject({virtuals: true}), 'password');

      bj = new Buffer(JSON.stringify({FROM: user_id, TO: org._id })).toString('base64');

      res.render('organization', {
        classBody: "page",
        org: org,
        base_json: bj,
        user: user
      });
    });
});

module.exports = router;