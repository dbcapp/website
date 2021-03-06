'use strict';

const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty')();
const User = require('../../models/user');
const _ = require('lodash');
const fs = require('fs');

router.get('/', (req, res) => {
  let user = req.session.user;

  if (!user) {
    res.redirect('/');
    res.end();
  }

  User.find({type: 'Donator'})
    .exec()
    .then((people) => {
      res.render('profile', {
        classBody: "page",
        response: req.flash(),
        people: people,
        user: user
      });
    });
});

router.post('/', multipart, (req, res) => {
  let currentUser = req.session.user;
  let data = _.pick(req.body, 'name', 'password');
  let emps = [];

  if (!currentUser) {
    res.redirect('/');
    res.end();
  } else {
    if (req.body.password === '') {
      delete data.password;
    } else if (req.body.password !== req.body.confirmPassword) {
      req.flash('error', 'You password not match');
      res.redirect('/user');
      res.end();
    }

    if(currentUser.type == "Organization") {
      data.organization = _.pick(req.body, 'description', 'paypalButton');
      data.organization.picture = req.files.picture;
    }

    User
      .findOneAndUpdate({_id: currentUser._id}, {
        $set: data
      })
      .then((user) => {
        let promise = Promise.resolve(user);
        if (req.files.picture && req.files.picture.size) {
          promise = new Promise((resolve, reject) => {
            user.organization.attach('picture', {path: req.files.picture.path}, (err) => {
              if (err) {
                reject(err);
              } else {
                fs.unlinkSync(req.files.picture.path);
                resolve();
              }
            })
          }).then(() => {
            return user.save();
          });
        }

        return promise;
      })
      .then((user) => {
        req.flash('success', 'Organization updated');
        req.session.user = user.toObject({virtuals: true});
        req.session.save(() => {
          res.redirect('/user');
          res.end();
        });
      })
      .catch((error) => {
        console.log(error);
        req.flash('error', 'Error when trying to update a organization');
        res.redirect('/user');
        res.end();
      });
    ;
  }

});

module.exports = router;
