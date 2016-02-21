'use strict';

const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const _ = require('lodash');

router.get('/:id', (req, res) => {
  let id = req.params.id;

  User.findOne({_id: id})
    .exec()
    .then((response) => {
      response = _.omit(response.toObject({virtuals: true}), 'password');

      res.render('organization', {
        classBody: "page",
        user: response
      });
    });
});

router.get('/:id/donate', (req, res) => {
  let id = req.params.id;

  User.findOne({_id: id})
    .exec()
    .then((response) => {
      response = _.omit(response.toObject({virtuals: true}), 'password');

      res.render('organization', {
        classBody: "page",
        user: response
      });
    });
});


module.exports = router;