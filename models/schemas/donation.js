'use strict';

const mongoose = require('mongoose');

// Schema
const schema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  value: {type: Number, required: true},
  transaction: {type: mongoose.Schema.Types.Mixed}
});

// Plugins
schema.plugin(require('./plugins/base'));

module.exports = schema;
