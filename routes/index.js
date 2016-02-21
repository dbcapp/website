'use strict';

const express = require('express');
const router = express.Router();

router.use('/', require('./public'));
router.use('/api', require('./api'));
router.use('/paypal', require('./paypal'));

// Page 404
router.use((req, res, next) => { // jshint ignore:line
  res.render('404');
});

module.exports = router;
