'use strict';

const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const _ = require('lodash');

router.use('/register', require('./register'));
router.use('/organization', require('./organization'));


router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login', {
    classBody: "page"
  });
});

router.get('/logout', (req, res) => {
  res.render('logout');
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
  let term = false;
  let q = {type: 'Organization'};

  if(req.query.hasOwnProperty('page')){
    skip = parseInt(req.query.page);
  }

  if(req.query.hasOwnProperty('title')){
    q = {
      type: 'Organization',
      'organization.name': new RegExp(req.query.term, 'i')
    };
  }

  if(req.query.hasOwnProperty('tags')) {
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
        orgs: response
      });
    });
});

module.exports = router;