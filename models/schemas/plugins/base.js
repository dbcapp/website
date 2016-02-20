'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

module.exports = (schema) => {
  // Schema
  schema.add({createdAt: {type: Date, default: Date.now}});
  schema.add({updatedAt: {type: Date}});
  schema.add({deletedAt: {type: Date, default: null}});

  // Hooks
  schema.pre('find', function(next) {
    if (JSON.stringify(this.where()._conditions).indexOf('deletedAt') === -1) {
      this.where('deletedAt', null);
    }
    next();
  });
  schema.pre('findOne', function(next) {
    if (JSON.stringify(this.where()._conditions).indexOf('deletedAt') === -1) {
      this.where('deletedAt', null);
    }
    next();
  });

  schema.pre('findOneAndUpdate', function(next) {
    this.update({}, {$set: {updatedAt: Date.now()}});
    next();
  });
  schema.pre('update', function(next) {
    this.update({}, {$set: {updatedAt: Date.now()}});
    next();
  });
  schema.pre('save', function(next) {
    this.wasNew = this.isNew;
    next();
  });
  schema.pre('save', function(next) {
    this.set('updateAt', Date.now());
    next();
  });

  // Schema functions
  schema.methods.removeLogical = function() {
    this.deletedAt = Date.now();

    return this.save();
  };

  // Plugin
  schema.plugin(mongoosePaginate);
};
