'use strict';

const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty')();
const User = require('../../models/user');
const _ = require('lodash');
const saveTmpFiles = require('../../helpers/saveTmpFile');
const fs = require('fs');

router.get('/', (req, res) => {
  let user = req.session.user;

  if(!user) {
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

  if(!currentUser) {
    res.redirect('/');
    res.end();
  }
  if(currentUser.type == "Donator") {
    if(req.body.password != "" && req.body.password != req.body.confirmPassword){
      req.flash('error', 'You password not match');
      res.redirect('/user');
      res.end();
    } else {
      let user = null;
      let savePromise = User.findOne({_id: currentUser._id})
        .then((existingUser) => {
          if (!existingUser) {
            req.flash('error', 'User does not exists');
            res.redirect('/user');
            res.end();
          }

          let updateUserData = _.cloneDeep(data);
          user = existingUser;
          user.set(updateUserData);
        });

      savePromise
        .then(() => user.save())
        .then((document) => {
          req.flash('success', 'User updated');
          req.session.user = document;
          res.redirect('/user');
          res.end();
        })
        .catch((error) => {
          req.flash('error', 'Error when trying to update a donator');
          res.redirect('/user');
          res.end();
        });
    }
  } else {
    data.organization = _.pick(req.body, 'description', 'employees');
    data.organization.picture = req.files.picture;

    let user = null;
    let savePromise = User.findOne({_id: currentUser._id})
      .then((existingUser) => {
        if (!existingUser) {
          req.flash('error', 'User does not exists');
          res.redirect('/user');
          res.end();
        }

        let existingPicture = _.cloneDeep(existingUser.organization.picture);
        let updateUserData = _.cloneDeep(data);

        if (updateUserData.organization && updateUserData.organization.picture) {
          delete updateUserData.organization.picture;
        }

        user = existingUser;
        user.set(updateUserData);
        user.organization.picture = existingPicture;
      });

    if (data.organization.picture) {
      savePromise = savePromise.then(() => saveTmpFiles(data.organization.picture, 'jpg'))
        .then((tmpFilePath) => {
          return new Promise((resolve, reject) => {
            user.organization.attach('picture', {path: tmpFilePath}, (err) => {
              if (err) {
                reject(err);
              } else {
                fs.unlinkSync(tmpFilePath);
                resolve(err);
              }
            })
          });
        });
    }

    savePromise
      .then(() => user.save())
      .then((document) => {
        req.flash('success', 'Organization updated');
        req.session.user = document;
        res.redirect('/user');
        res.end();
      })
      .catch((error) => {
        console.log(error);
        req.flash('error', 'Error when trying to update a organization');
        res.redirect('/user');
        res.end();
      });
  }

});

module.exports = router;