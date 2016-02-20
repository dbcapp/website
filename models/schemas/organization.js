'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  tags: [{type: String}]
});

module.exports = schema;
