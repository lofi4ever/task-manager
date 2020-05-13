const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transgorm: (doc, ret) => {
    delete ret.id;
    delete ret.hash;
  }
});

module.exports = mongoose.model('User', schema);