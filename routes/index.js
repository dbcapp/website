'use strict';

const express = require('express');
const router = express.Router();

router.use('/', require('./public'));
router.use('/api', require('./api'));
router.use('/paypal', require('./paypal'));

module.exports = router;
