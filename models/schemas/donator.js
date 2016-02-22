'use strict';

const path = require('path');
const mongoose = require('mongoose');
const crate = require('mongoose-crate');
const LocalFS = require('mongoose-crate-localfs');
const GraphicsMagic = require('mongoose-crate-gm');

const schema = new mongoose.Schema({});

schema.virtual('pictureUrl').get(function() {
  let url = null;

  if (this.picture && this.picture.original && this.picture.original.url) {
    url = `${this.picture.original.url.replace(path.join(path.resolve('./'), 'public'), '')}`;
  }

  return url;
});

schema.plugin(crate, {
  storage: new LocalFS({
    directory: path.join(path.resolve('./'), 'public/uploads/donator')
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
