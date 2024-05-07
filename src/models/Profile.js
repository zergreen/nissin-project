const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
