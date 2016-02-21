'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/user');
const _ = require('lodash');
const saveTmpFiles = require('../../helpers/saveTmpFile');
const fs = require('fs');

router.get('/', (req, res) => {
  res.render('register/choose', {
    classBody: "page"
  });
});

// Donator
router.get('/user', (req, res) => {
  res.render('register/user', {
    classBody: "page",
    response: req.flash(),
  });
});

router.post('/user', (req, res) => {
  let data = _.pick(req.body, 'name', 'email', 'password', 'donator');
  data.donator = _.pick(data.donator, 'picture');
  data.type = 'Donator';

  if(req.body.password != req.body.confirmPassword){
    req.flash('error', 'Password not match');
    req.flash('user', req.body);
    res.redirect('/register/user');
    res.end();
  } else {
    let user = new User(data);

    let savePromise = User.findOne({email: user.email})
      .then((existingUser) => {
        if (existingUser) {
          req.flash('error', 'User already exists');
          req.flash('user', req.body);
          res.redirect('/register/user');
          res.end();
        }
      });

    if (data.donator.picture) {
      savePromise = savePromise.then(() => saveTmpFiles(data.donator.picture, 'jpg'))
        .then((tmpFilePath) => {
          return new Promise((resolve, reject) => {
            user.donator.attach('picture', {path: tmpFilePath}, (err) => {
              if (err) {
                reject(err);
              } else {
                fs.unlinkSync(tmpFilePath);
                resolve(err);
              }
            })
          });
        })
    }

    savePromise
      .then(() => user.save())
      .then((document) => {
        res.redirect('/register/finish');
        res.end();
      })
      .catch((error) => {
        req.flash('error', 'Error when trying to register a donator');
        req.flash('user', req.body);
        res.redirect('/register/user');
        res.end();
      });
  }
});

router.put('/user/:id', (req, res) => {
  let id = req.params.id;
  let data = _.pick(req.body, 'name', 'password', 'donator');
  data.donator = _.pick(data.donator, 'picture');

  let user = null;
  let savePromise = User.findOne({_id: id})
    .then((existingUser) => {
      if (!existingUser) {
        req.flash('error', 'User does not exists');
      }

      let existingPicture = _.cloneDeep(existingUser.donator.picture);

      let updateUserData = _.cloneDeep(data);
      if (updateUserData.donator && updateUserData.donator.picture) {
        delete updateUserData.donator.picture;
      }

      user = existingUser;
      user.set(updateUserData);

      user.donator.picture = existingPicture;
    });

  if (data.donator.picture) {
    savePromise = savePromise.then(() => saveTmpFiles(data.donator.picture, 'jpg'))
      .then((tmpFilePath) => {
        return new Promise((resolve, reject) => {
          user.donator.attach('picture', {path: tmpFilePath}, (err) => {
            if (err) {
              reject(err);
            } else {
              fs.unlinkSync(tmpFilePath);
              resolve(err);
            }
          })
        });
      })
  }

  savePromise
    .then(() => user.save())
    .then((document) => {
      res.json({updated: true, id: document.id});
      res.end();
    })
    .catch((error) => {
      req.flash('error', 'Error when trying to update a donator');
      // No have page
      res.redirect('/');
    });
});

// Organization
router.get('/organization', (req, res) => {
  res.render('register/organization', {
    classBody: "page",
    response: req.flash()
  });
});

router.get('/organization/:id', (req, res) => {
  let id = req.params.id;

  User.findOne({_id: id})
    .exec()
    .then((org) => {
      org = _.omit(org.toObject({virtuals: true}), 'password');

      res.render('register/organization-info', {
        classBody: "page",
        org: org,
        response: req.flash()
      });
    });
});

router.post('/organization', (req, res) => {
  let data = _.pick(req.body, 'name', 'email', 'password', 'organization');
  data.organization = _.pick(data.organization, 'tags', 'picture', 'employees');
  data.type = 'Organization';


  if(req.body.name == "" || req.body.email == "" || req.body.password){
    req.flash('error', 'Complete all fields');
    req.flash('user', req.body);
    res.redirect('/register/organization');
    req.end();
  } else if(req.body.password != req.body.confirmPassword) {
    req.flash('error', 'You password not match');
    req.flash('user', req.body);
    res.redirect('/register/organization');
    req.end();
  } else {
    let user = new User(data);
    let savePromise = User.findOne({email: user.email})
      .then((existingUser) => {
        if (existingUser) {
          req.flash('error', 'User already exists');
          res.redirect('/register/organization');
          req.end();
        }
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
        })
    }

    savePromise
      .then(() => user.save())
      .then((document) => {
        res.redirect(`/register/organization/${document.id}`);
        res.end();
      })
      .catch((error) => {
        req.flash('error', 'Error when trying to register a organization');
        res.redirect('/register/organization');
        res.end();
      });
  }
});

router.put('/organization/:id', (req, res) => {
  let id = req.params.id;
  let data = _.pick(req.body, 'name', 'password', 'organization');
  data.organization = _.pick(data.organization, 'tags', 'picture', 'employees');

  let user = null;
  let savePromise = UserModel.findOne({_id: id})
    .then((existingUser) => {
      if (!existingUser) {
        req.flash('error', 'User does not exists');
        res.redirect(`/register/organization/${id}`);
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
      })
  }

  savePromise
    .then(() => user.save())
    .then((document) => {
      res.redirect('/register/finish');
      res.end();
    })
    .catch((error) => {
      req.flash('error', 'Error when trying to register a organization');
      res.redirect(`/register/organization/${id}`);
      res.end();
    });
});

// Finish Register
router.get('/finish', (req, res) => {
  res.render('register/finish', {
    classBody: "page"
  });
});

module.exports = router;