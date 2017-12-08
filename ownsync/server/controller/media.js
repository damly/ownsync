var uri = require('../api').ApiMedia
var code = require('../api').ApiCode
var Media = require('../model/media')
var User = require('../model/user')
var utils = require('./utils')
var config = require('../../config')
var path = require('path')
var crypto = require('crypto')

module.exports = function (apiRouter) {
  apiRouter.post(uri.upload, function (req, res) {
    if (!req.files) {
      utils.response(res, code.error, '没有上传的文件!')
      return
    }

    let type = typeof (req.body.type) === 'undefined' ? 1 : req.body.type

    let token = utils.getToken(req)
    if (token) {
      let login = utils.decodeToken(token).payload.data
      User.findOne({login: login}, (err, doc) => {
        if (err) {
          utils.response(res, code.error, err)
        } else {
          let files = []
          if (req.files.file instanceof Array) {
            files = files.concat(req.files.file)
          } else {
            files.push(req.files.file)
          }
          let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
          let errs = []

          files.forEach((file, index) => {
            let md5 = crypto.createHash('md5').update(file.data).digest('hex')
            let url = staticPath + '/upload/' + md5 + utils.getMime(file.name, file.mimetype)
            file.mv('.' + url, ferr => {
              if (ferr) {
                errs.push({name: file.name})
              } else {
                var media = new Media({
                  owner: doc.login,
                  nickname: doc.nickname,
                  title: file.name,
                  create: new Date(),
                  type: type,
                  url: url,
                  mime: file.mimetype,
                  md5: md5
                })
                media.save()
              }
            })
          })

          if (!errs.length) {
            utils.response(res, code.success, {count: files.length})
          } else if (errs.length === files.length) {
            utils.response(res, code.error, errs)
          } else {
            utils.response(res, code.success, errs)
          }
        }
      })
    } else {
      utils.response(res, code.error, '无效的token!')
    }
  })

  apiRouter.post(uri.list, function (req, res) {
    let token = utils.getToken(req)
    if (token) {
      let login = utils.decodeToken(token).payload.data
      User.findOne({login: login}, (err, user) => {
        if (err) {
          utils.response(res, code.error, err)
        } else {
          let key = {$or: [{'owner': user.login}, {'type': 0}]}
          if (!user.type) key = {owner: user.login}
          Media.find(key, ['owner', 'nickname', 'title', 'create', 'type', 'url', 'mime', 'md5'], (error, docs) => {
            if (error) {
              utils.response(res, code.error, error)
            } else {
              utils.response(res, code.success, docs)
            }
          })
        }
      })
    } else {
      utils.response(res, code.error, '无效的token!')
    }
  })
}
