const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    role: { type: String, required: false },
 });
 
module.exports = mongoose.model('Users', UserSchema)


