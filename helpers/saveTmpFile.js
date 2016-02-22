'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = (base64, fileExtension) => {
  base64 = base64.replace(/^data:image\/(.*);base64,/, '');

  let tmpFilePath = path.join(path.resolve('./'), 'public/uploads/tmp/', crypto.randomBytes(64).toString('hex')) + `.${fileExtension}`;

  return new Promise((resolve, reject) => {
    fs.writeFile(tmpFilePath, base64, 'base64', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(tmpFilePath);
      }
    });
  })
};
