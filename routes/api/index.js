'use strict';

const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/registration', require('./registration'));
router.use('/organization', require('./organization'));

router.use((err, req, res, next) => { // jshint ignore:line
  let errorPayload = {
    message: err.message || JSON.stringify(err)
  };
  errorPayload.stack = err.stack;

  if (err.originalError) {
    errorPayload.originalError = err.originalError.message || JSON.stringify(err.originalError);
  }

  res
    .status(err.status || 500)
    .json(errorPayload);
});

module.exports = router;
