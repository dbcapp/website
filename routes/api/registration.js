'use strict';

const express = require('express');
const passport = require('passport');
const controller = require('../../controllers/api/registration');
const router = express.Router();

router.post('/user', controller.user);

module.exports = router;
