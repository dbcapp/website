'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/user');
const _ = require('lodash');

router.get('/', (req, res) => {
  res.render('register/choose', {
    classBody: "page"
  });
});

router.get('/user', (req, res) => {
  res.render('register/user', {
    classBody: "page"
  });
});

router.get('/organization', (req, res) => {
  res.render('register/organization', {
    classBody: "page"
  });
});

router.get('/organization/:id', (req, res) => {
  let id = req.params.id;

  User.findOne({_id: id})
    .exec()
    .then((response) => {
      response = _.omit(response.toObject(), 'password');

      res.render('register/organization-info', {
        classBody: "page",
        org: response
      });
    });
});

router.get('/finish', (req, res) => {
  res.render('register/finish', {
    classBody: "page"
  });
});

module.exports = router;