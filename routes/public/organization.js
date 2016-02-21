'use strict';

const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const _ = require('lodash');

router.get('/:id', (req, res) => {
  let id = req.params.id;
  let bj = {};

  User.findOne({_id: id})
    .exec()
    .then((response) => {
      response = _.omit(response.toObject({virtuals: true}), 'password');

      bj = new Buffer(JSON.stringify({FROM: null, TO: response._id })).toString('base64');

      res.render('organization', {
        classBody: "page",
        user: response,
        base_json: bj
      });
    });
});

module.exports = router;