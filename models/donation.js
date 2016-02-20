'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const schema = require('./schemas/donation');

const Model = mongoose.model('Donation', schema);

module.exports = Model;
