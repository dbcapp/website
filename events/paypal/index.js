'use strict';

exports.success = (data) => {
  console.log({'action': 'success', 'data': data});
};

exports.error = (data) => {
  console.log({'action': 'error', 'data': data});
};

exports.process = (data) => {
  console.log({'action': 'process', 'data': data});
};