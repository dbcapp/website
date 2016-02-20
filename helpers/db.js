'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('config');

exports.connect = (options) => {
  options = options || {server: {poolSize: 10}};
  mongoose.connect(config.mongodb, options);

  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Connection open');
  });

  db.on('connected', () => {
    console.log('Connected');
  });

  db.on('disconnected', () => {
    console.log('Disconnected');
  });

  db.on('error', (error) => {
    console.log('Connection error', error);
  });

  process.on('SIGINT', () => {
    db.close(() => {
      console.log('Connection closed by ctrl+C command');
      process.exit(0);
    });
  });
};

exports.disconnect = () => {
  mongoose.disconnect();
};
