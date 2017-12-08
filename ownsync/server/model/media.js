const mongoose = require('mongoose')

const mediaSchema = mongoose.Schema({
  md5: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  owner: {
    type: String,
    required: true,
    trim: true
  },
  nickname: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true
  },
  create: {
    type: Date,
    default: Date.now()
  },
  url: {
    type: String,
    require: true,
    trim: true
  },
  mime: {
    type: String,
    require: true
  },
  type: {
    type: Number,
    require: true,
    default: 1
  }
})

const Media = mongoose.model('Media', mediaSchema)

module.exports = Media
