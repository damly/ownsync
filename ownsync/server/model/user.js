const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  login: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
  nickname: {
    type: String,
    require: true,
    trim: true
  },
  token: {
    type: String,
    require: true,
    trim: true
  },
  type: {
    type: Number,
    require: true,
    default: 0
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
