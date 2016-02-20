'use strict';

const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/registration', require('./registration'));

router.use((err, req, res, next) => { // jshint ignore:line
  let errorPayload = {
    message: err.message || JSON.stringify(err)
  };
  errorPayload.stack = err.stack;

  res
    .status(err.status || 500)
    .json(errorPayload);
});

module.exports = router;
