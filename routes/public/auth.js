'use strict';

const express = require("express");
const router = expess.Router();


router.get('/login', (req, res) => {
  res.render('login', {
    classBody: "page"
  });
});

router.get('/logout', (req, res) => {
  res.render('logout');
});

module.exports = router;