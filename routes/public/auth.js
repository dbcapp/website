'use strict';

const express = require("express");
const router = express.Router();


router.get('/login', (req, res) => {
  res.render('login', {
    classBody: "page"
  });
});

router.post('/login', (req, res) => {
  let params = req.body;


  if(params.email == "" || params.password == ""){
    req.flash('error', 'You email or password is incorrect!');
    req.flash('user', params);
    res.redirect('/auth/login');
    res.end();
  } else {
    
  }
});

router.get('/logout', (req, res) => {
  res.render('logout');
});

module.exports = router;