'use strict';

const Donation = require('../../models/donation');

// Helpers
function saveDonation(data, status) {
  return Donation.findOne({
    'transactionData.transaction.id': data.transaction.id
  }).then((donation) => {
    if (!donation) {
      donation = new Donation({
        from: data.data.from,
        to: data.data.to,
        value: data.transaction.gross,
        transactionData: data,
        status
      });
    } else {
      donation.set({
        status
      })
    }

    return donation.save();
  });
}

exports.success = (data) => {
  console.log('success', data);
  saveDonation(data, 'Done');
};

exports.error = (data) => {
  console.log('success', data);
  saveDonation(data, 'Error');
};

exports.process = (data) => {
  console.log('success', data);
  saveDonation(data, 'Processing');
};
