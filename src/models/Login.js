const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
    loginId: {
      type: String,
      required: true,
    },
    username: { type: String, required: false },
    password: { type: String, required: false},
    lname : { type: String, required: false},
    email : {type: String, required: false},
    year: { type: String, require: false},
    branch: { type: String, require: false},
    createdAt: {
        type: Date,
        default: Date.now,
      },
 });


module.exports = mongoose.model('Login', LoginSchema)