'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/user');
const _ = require('lodash');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('about', {
    classBody: "page"
  });
});

router.get('/find', (req, res) => {
  res.render('find', {
    classBody: "page"
  });
});

router.get('/login', (req, res) => {
  res.render('login', {
    classBody: "page"
  });
});

router.get('/register', (req, res) => {
  res.render('register', {
    classBody: "page"
  });
});

router.get('/register/user', (req, res) => {
  res.render('register-user', {
    classBody: "page"
  });
});

router.get('/register/organization', (req, res) => {
  res.render('register-ngo', {
    classBody: "page"
  });
});

router.get('/register/organization/:id', (req, res) => {
  let id = req.params.id;
  let org = {};

  User.findOne({_id: id})
    .exec()
    .then((response) => {
      response = _.omit(response.toObject(), 'password');

      res.render('register-ngo-infos', {
        classBody: "page",
        org: response
      });
    });
});

module.exports = router;