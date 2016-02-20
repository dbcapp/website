'use strict';

const express = require('express');
const router = express.Router();

// Register pages
router.use('/register', require('./register'));

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

module.exports = router;