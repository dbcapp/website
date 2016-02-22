'use strict';

const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Donation = require('../../models/donation');
const _ = require('lodash');

router.get('/donate', (req, res) => {
  res.render('donate', {
    classBody: "page"
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  let bj = {};
  let user = req.session.user;
  let user_id = (user) ? user._id : null;

  User.findOne({_id: id})
    .then((org) => {
      return Donation.find({to: id})
        .populate('from')
        .then((donations) => {
          org = _.omit(org.toObject({virtuals: true}), 'password');

          org.donations = donations;

          return org;
        })
    })
    .then((org) => {
      bj = new Buffer(JSON.stringify({
        from: user_id,
        to: org._id
      })).toString('base64');

      res.render('organization', {
        classBody: "page",
        org: org,
        base_json: bj,
        user: user
      });
    });
});

module.exports = router;
