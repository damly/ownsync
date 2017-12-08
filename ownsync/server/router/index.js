var express = require('express')
var apiRouter = express.Router()

require('../controller/user')(apiRouter)
require('../controller/media')(apiRouter)

module.exports = apiRouter
