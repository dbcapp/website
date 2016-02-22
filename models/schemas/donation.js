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
  transactionData: {type: mongoose.Schema.Types.Mixed},
  status: {
    type: String,
    enum: ['Processing', 'Done', 'Error'],
    default: 'Processing'
  },
  credited: {type: Boolean, default: false}
});

// Indexes
schema.index({
  from: 1,
  to: 1,
  'transactionData.transaction.id': 1,
  deletedAt: -1
}, {unique: true});

// Plugins
schema.plugin(require('./plugins/base'));

module.exports = schema;
