const mongoose = require('mongoose')

const ApplySchema = new mongoose.Schema({
    applyId: {
      type: String,
      required: true,
    },
    username: { type: String, required: false },
    name: { type: String, require: false},
    department: { type: String, required: false },
    year: { type: String, require: false},
    createdAt: {
        type: Date,
        default: Date.now,
      },
 });


module.exports = mongoose.model('Apply', ApplySchema)