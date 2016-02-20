'use strict';

const express = require('express');
const router = express.Router();

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

router.get('/register/ngo', (req, res) => {
  res.render('register-ngo', {
    classBody: "page"
  });
});

module.exports = router;