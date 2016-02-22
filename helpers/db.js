'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('config');

exports.connect = (options) => {
  options = options || {server: {poolSize: 10}};
  mongoose.connect(config.mongodb, options);

  let connection = mongoose.connection;

  connection.once('open', () => {
    console.log('Connection open');
  });

  connection.on('connected', () => {
    console.log('Connected');
  });

  connection.on('disconnected', () => {
    console.log('Disconnected');
  });

  connection.on('error', (error) => {
    console.log('Connection error', error);
  });

  process.on('SIGINT', () => {
    connection.close(() => {
      console.log('Connection closed by ctrl+C command');
      process.exit(0);
    });
  });

  return connection;
};

exports.disconnect = () => {
  mongoose.disconnect();
};
