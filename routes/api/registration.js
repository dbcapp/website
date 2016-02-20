'use strict';

const express = require('express');
const passport = require('passport');
const controller = require('../../controllers/api/registration');
const router = express.Router();

router.post('/donator', controller.createDonator);
router.put('/donator/:id', passport.authenticate('jwt-api'), controller.updateDonator);

router.post('/organization', controller.createOrganization);
router.put('/organization/:id', passport.authenticate('jwt-api'), controller.updateOrganization);

module.exports = router;
