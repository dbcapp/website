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

  if (params.email == "" || params.password == "") {
    req.flash('error', 'You email or password is incorrect!');
    res.redirect('/auth/login');
    res.end();
  } else {
    User.findOne({email: params.email})
      .then((user) => {
        if (user && user.passwordMatch(params.password)) {
          req.session.user = user;
          req.session.save(() => {
            res.redirect('/');
            res.end();
          });
        } else {
          req.flash('error', 'You email or password is incorrect!');
          res.redirect('/auth/login');
          res.end();
        }
      })
      .catch((err) => {
        req.flash('error', err.message);
        res.redirect('/auth/login');
        res.end();
      });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
