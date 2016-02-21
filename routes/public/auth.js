'use strict';

const express = require("express");
const router = express.Router();
const User = require('../../models/user');


router.get('/login', (req, res) => {
  res.render('login', {
    classBody: "page",
    response: req.flash()
  });
});

router.post('/login', (req, res) => {
  let params = req.body;

  if(params.email == "" || params.password == ""){
    req.flash('error', 'You email or password is incorrect!');
    res.redirect('/auth/login');
    res.end();
  } else {
    // aqui rafa
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;