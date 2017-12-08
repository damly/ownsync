var config = require('../config')

var opn = require('opn')
var path = require('path')
var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload')
var apiRouter = require('../server/router')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ownsync');

var port = process.env.PORT || config.dev.port

var app = express()

webpackConfig(app)

app.use(fileUpload())
// //获取post的参数，放在router之前,request.body.xxxx
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use(apiRouter)

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log(`Your application is running here: ` + uri);
  opn(uri)
})
