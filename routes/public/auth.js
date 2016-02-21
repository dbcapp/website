'use strict';

const express = require("express");
const router = express.Router();


router.get('/login', (req, res) => {
  res.render('login', {
    classBody: "page"
  });
});

router.post('/login', (req, res) => {
  
});

router.get('/logout', (req, res) => {
  res.render('logout');
});

module.exports = router;