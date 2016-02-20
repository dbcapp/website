'use strict';

const express = require('express');
const passport = require('passport');
const controller = require('../../controllers/api/auth');
const router = express.Router();

router.get('/unauthorized', controller.unauthorized);

router.post('/',
  passport.authenticate('email-api'),
  controller.auth);

module.exports = router;
