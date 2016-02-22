'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = (fileData, fileExtension) => {
  let type = 'base64';
  
  if (typeof fileData === 'string') {
    fileData = fileData.replace(/^data:image\/(.*);base64,/, '');
  } else if(typeof fileData === 'object'){
    let bit = fs.readFileSync(fileData.path);
    fileData = new Buffer(bit).toString('base64');
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
