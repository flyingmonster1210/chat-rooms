const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  }
  ,
  email: {
    type: String,
    required: [true, 'Please add an email'],
  }
},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema, 'users')
