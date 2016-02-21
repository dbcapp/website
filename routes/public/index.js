'use strict';

const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const _ = require('lodash');

router.get('/', (req, res) => {
  User.find({type: "Organization"})
    .limit(3)
    .sort('-createdAt')
    .exec()
    .then((response) => {
      response = response.map((item) => _.omit(item.toObject({virtuals: true}), 'password'));

      res.render('index', {
        lastOrgs: response
      });
    });
});

router.get('/about', (req, res) => {
  res.render('about', {
    classBody: "page"
  });
});

router.get('/find', (req, res) => {
  const limit = 12;
  let skip = 0;
  let totalPages = 0;
  let term = "";
  let q = {type: 'Organization'};

  if (req.query.hasOwnProperty('page')) {
    skip = parseInt(req.query.page);
  }

  if (req.query.hasOwnProperty('title')) {
    q = {
      type: 'Organization',
      'organization.name': new RegExp(req.query.title, 'i')
    };

    term = req.query.title;
  }

  if (req.query.hasOwnProperty('tags')) {
    q = {
      type: 'Organization',
      'organization.tags': new RegExp(req.query.tags, 'i')
    };
  }

  User.find(q)
    .skip(skip).limit(limit)
    .exec()
    .then((response) => {
      response = response.map((item) => _.omit(item.toObject(), 'password'));

      res.render('find', {
        classBody: "page",
        orgs: response,
        term: term
      });
    });
});

router.use('/register', require('./register'));
router.use('/organization', require('./organization'));
router.use('/auth', require('./auth'));

module.exports = router;
