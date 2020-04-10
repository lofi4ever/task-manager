const mongoose = require('mongoose');

module.exports = mongoose.model('Task', new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true
  },
  description: String,
  isComplete: Boolean
}));