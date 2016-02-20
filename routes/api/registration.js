'use strict';

const express = require('express');
const controller = require('../../controllers/api/registration');
const router = express.Router();

router.post('/donator', controller.donator);

router.post('/organization', controller.organization);

module.exports = router;
