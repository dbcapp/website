'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = (fileData, fileExtension) => {
  let type = null;
  if (typeof fileData === 'string') {
    type = 'base64';
    fileData = fileData.replace(/^data:image\/(.*);base64,/, '');
  }

  let tmpFilePath = path.join(path.resolve('./'), 'public/uploads/tmp/', crypto.randomBytes(64).toString('hex')) + `.${fileExtension}`;

  return new Promise((resolve, reject) => {
    fs.writeFile(tmpFilePath, fileData, type, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(tmpFilePath);
      }
    });
  })
};
