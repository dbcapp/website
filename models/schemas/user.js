'use strict';

const mongoose = require('mongoose');
const crypt = require('../../helpers/crypt');
const organizationSchema = require('./organization');
const donatorSchema = require('./donator');

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

module.exports = schema;
