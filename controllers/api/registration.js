'use strict';

const _ = require('lodash');
const UserModel = require('../../models/user');
const saveTmpFiles = require('../../helpers/saveTmpFile');
const fs = require('fs');

exports.createDonator = (req, res, next) => {
  let data = _.pick(req.body, 'name', 'email', 'password', 'donator');
  data.donator = _.pick(data.donator, 'picture');

  data.type = 'Donator';

  let user = new UserModel(data);

  let savePromise = UserModel.findOne({email: user.email})
    .then((existingUser) => {
      if (existingUser) {
        throw new Error('User already exists');
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
      res.json({created: true, id: document.id});
      res.end();
    })
    .catch((error) => {
      let err = new Error('Error when trying to register a organization');
      err.status = 500;
      err.originalError = error;
      next(err);
    });
};

exports.createOrganization = (req, res, next) => {
  let data = _.pick(req.body, 'name', 'email', 'password', 'organization');
  data.organization = _.pick(data.organization, 'tags', 'picture', 'employees');

  data.type = 'Organization';

  let user = new UserModel(data);
  let savePromise = UserModel.findOne({email: user.email})
    .then((existingUser) => {
      if (existingUser) {
        throw new Error('User already exists');
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
      res.json({created: true, id: document.id});
      res.end();
    })
    .catch((error) => {
      let err = new Error('Error when trying to register a organization');
      err.status = 500;
      err.originalError = error;
      next(err);
    });
};
