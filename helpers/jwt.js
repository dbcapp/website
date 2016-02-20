'use strict';

const jwt = require('jsonwebtoken');

exports.generate = (payload) => jwt.sign(payload, process.env.NODE_JWT_KEY);
