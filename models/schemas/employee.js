'use strict';

const path = require('path');
const mongoose = require('mongoose');
const crate = require('mongoose-crate');
const LocalFS = require('mongoose-crate-localfs');

const schema = new mongoose.Schema({
  _id: false,
  name: {type: String}
});

schema.plugin(crate, {
  storage: new LocalFS({
    directory: path.join(path.resolve('./'), 'public/uploads/employee')
  }),
  fields: {
    picture: {}
  }
});

module.exports = schema;
