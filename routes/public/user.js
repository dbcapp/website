'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  let user = req.session.user;

  if(!user) {
    res.redirect('/');
    res.end();
  }

  res.render('profile', {
    response: req.flash(),
    user: user
  });
});

router.post('/', (req, res) => {
  let user = req.session.user;

  if(!user) {
    res.redirect('/');
    res.end();
  }
  
});

module.exports = router;