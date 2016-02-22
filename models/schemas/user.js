'use strict';

const mongoose = require('mongoose');
const crypt = require('../../helpers/crypt');
const organizationSchema = require('./organization');
const donatorSchema = require('./donator');
const moment = require('moment');

// Schema
const schema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  type: {type: String, enum: ['Organization', 'Donator'], required: true},
  password: {
    type: String,
    set: crypt.hash
  },
  organization: organizationSchema,
  donator: donatorSchema
});

// Indexes
schema.index({email: 1, deletedAt: -1}, {unique: true});

// Plugins
schema.plugin(require('./plugins/base'));

// Virtuals
schema.virtual('createdFormated').get(function() {
  return moment(this.createdAt).format('DD MMM YYYY');
});

schema.virtual('lastDonation').get(function() {
  let data = null;
  if (this.organization) {
    data = moment(this.organization.lastDonation).fromNow();
  }
  
  return data;
});

module.exports = schema;
