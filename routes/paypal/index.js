'use strict';
const config = require('../../config/default.json');
const paypal = require('paypal-middleware');
const express = require('express');
const events = require('../../events');
const router = express.Router();

const cfg = {
  debug: config.paypal.debug,
  process: events.paypal.process,
  success: events.paypal.success,
  error: events.paypal.error
};

router.use('/', paypal(cfg));

router.use((err, req, res, next) => { // jshint ignore:line
  console.log(err);
  res.status(500);
  res.end();
});

module.exports = router;
