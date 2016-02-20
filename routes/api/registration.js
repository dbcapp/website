'use strict';

const express = require('express');
const passport = require('passport');
const controller = require('../../controllers/api/registration');
const router = express.Router();

router.post('/user', controller.user);

router.post('/organization', controller.organization);

module.exports = router;
