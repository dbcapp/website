'use strict';

const express = require('express');
const controller = require('../../controllers/api/registration');
const router = express.Router();

router.post('/donator', controller.createDonator);

router.post('/organization', controller.createOrganization);

module.exports = router;
