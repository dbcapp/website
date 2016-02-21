'use strict';

const mongoose = require('mongoose');
const schema = require('./schemas/donation');
const UserModel = require('./user');

// Hooks
const increaseTotalDonationInOrganization = (document) => {
  UserModel.update({_id: document.to}, {
    $inc: {
      'organization.totalDonations': document.value
    },
    $set: {
      'organization.lastDonationAt': new Date()
    }
  });
};

schema.post('save', increaseTotalDonationInOrganization);

const Model = mongoose.model('Donation', schema);

module.exports = Model;
