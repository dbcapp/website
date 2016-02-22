'use strict';

const path = require('path');
const mongoose = require('mongoose');
const employeeSchema = require('./employee');
const crate = require('mongoose-crate');
const LocalFS = require('mongoose-crate-localfs');
const GraphicsMagic = require('mongoose-crate-gm');

const schema = new mongoose.Schema({
  description: {type: String},
  address: {type: String},
  number: {type: String},
  city: {type: String},
  state: {type: String},
  employees: [employeeSchema],
  tags: [{type: String}],
  paypalButton: {type: String},
  totalDonations: {type: Number},
  lastDonationAt: {type: Date, default: Date.now}
});

schema.virtual('pictureUrl').get(function() {
  let url = null;

  if (this.picture) {
    url = `${this.picture.original.url.replace(path.join(path.resolve('./'), 'public'), '')}`;
  }

  return url;
});

schema.plugin(crate, {
  storage: new LocalFS({
    directory: path.join(path.resolve('./'), 'public/uploads/organization')
  }),
  fields: {
    picture: {
      processor: new GraphicsMagic({
        tmpDir: path.join(path.resolve('./'), 'public/uploads/tmp'),
        formats: ['JPEG', 'GIF', 'PNG'],
        transforms: {
          original: {}
        }
      })
    }
  }
});

module.exports = schema;
