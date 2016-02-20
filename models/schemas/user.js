'use strict';

const mongoose = require('mongoose');
const crypt = require('../../helpers/crypt');
const organizationSchema = require('./organization');

// Schema
const schema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  type: {type: String, enum: ['Organization', 'User'], required: true},
  password: {
    type: String,
    set: crypt.hash
  },
  organization: organizationSchema
});

// Indexes
schema.index({email: 1, deletedAt: -1}, {unique: true});

// Plugins
schema.plugin(require('./plugins/base'));

module.exports = schema;
