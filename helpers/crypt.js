'use strict';

const bcrypt = require('bcrypt');

exports.hash = (value) => bcrypt.hashSync(value, process.env.NODE_BCRYPT_SALT);

exports.compare = bcrypt.compareSync;
