'use strict';

const mongoose = require('mongoose');
const employeeSchema = require('./employee');

const schema = new mongoose.Schema({
  employees: [employeeSchema],
  tags: [{type: String}]
});

module.exports = schema;
