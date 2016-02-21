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
      let err = new Error('Error when trying to register a donator');
      err.status = 500;
      err.originalError = error;
      next(err);
    });
};

exports.updateDonator = (req, res, next) => {
  let id = req.params.id;
  let data = _.pick(req.body, 'name', 'password', 'donator');
  data.donator = _.pick(data.donator, 'picture');

  let user = null;
  let savePromise = UserModel.findOne({_id: id})
    .then((existingUser) => {
      if (!existingUser) {
        throw new Error('User does not exists');
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
      let err = new Error('Error when trying to update a donator');
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

exports.updateOrganization = (req, res, next) => {
  let id = req.params.id;
  let data = _.pick(req.body, 'name', 'password', 'organization');
  data.organization = _.pick(data.organization, 'tags', 'picture', 'employees');

  let user = null;
  let savePromise = UserModel.findOne({_id: id})
    .then((existingUser) => {
      if (!existingUser) {
        throw new Error('User does not exists');
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
      res.json({updated: true, id: document.id});
      res.end();
    })
    .catch((error) => {
      let err = new Error('Error when trying to register a organization');
      err.status = 500;
      err.originalError = error;
      next(err);
    });
};

exports.getDonators = (req, res) => {
  UserModel.find({type: 'Donator'})
    .exec()
    .then((people) => {
      people = people.map((item) => _.omit(item.toObject(), 'password'));

      res.json(people);
      res.end();
    })
};