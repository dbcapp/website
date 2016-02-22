'use strict';

const mongoose = require('mongoose');
const schema = require('./schemas/donation');
const UserModel = require('./user');

// Hooks
const increaseTotalDonationInOrganization = (document) => {
  if (document.status === 'Done' && !document.credited) {
    UserModel.update({_id: document.to}, {
        $inc: {
          'organization.totalDonations': document.value
        },
        $set: {
          'organization.lastDonationAt': new Date()
        }
      })
      .then(() => {
        console.log('---> 1');
      })
      .catch((err) => {
        console.log(err);
      });

    document.set({credited: true});
    document.save();
  }
};

schema.post('save', increaseTotalDonationInOrganization);

const Model = mongoose.model('Donation', schema);

module.exports = Model;
