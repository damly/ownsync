var uri = require('../api').ApiUser
var code = require('../api').ApiCode
var User = require('../model/user')
var utils = require('./utils')

User.findOne({login: '13570870407'}, function (err, doc) {
  if (!doc) {
    var admin = new User({
      login: '13570870407',
      password: '123456',
      nickname: '王玉满',
      token: '',
      type: 1
    })

    admin.save()
  }
})

module.exports = function (apiRouter) {
  apiRouter.post(uri.login, function (req, res) {
    let username = typeof (req.body.username) === 'undefined' ? '' : req.body.username
    let password = typeof (req.body.password) === 'undefined' ? '' : req.body.password

    console.log(uri.login, username, password)

    User.findOne({login: username, password: password}, (err, doc) => {
      if (doc) {
        doc.token = utils.createToken(doc.login, 100000)

        User.update({login: doc.login}, {token: doc.token}, (error) => {
          if (error) {
            utils.response(res, code.error, error)
          } else {
            let data = {
              login: doc.login,
              token: doc.token,
              nickname: doc.nickname,
              type: doc.type
            }
            utils.response(res, code.success, data)
          }
        })
      } else {
        utils.response(res, code.error, err)
      }
    })
  })

  apiRouter.post(uri.logout, function (req, res) {
    let token = utils.getToken(req)
    if (token) {
      let login = utils.decodeToken(token).payload.data
      User.findOne({login: login}, (err, doc) => {
        if (doc) {
          User.update({login: doc.login}, {token: ''}, (error) => {
            if (error) {
              utils.response(res, code.error, error)
            } else {
              utils.response(res, code.success, '')
            }
          })
        } else {
          utils.response(res, code.error, err)
        }
      })
    } else {
      utils.response(res, code.error, '无效的token!')
    }
  })

  apiRouter.post(uri.add, function (req, res) {
    let nickname = typeof (req.body.nickname) === 'undefined' ? '' : req.body.nickname
    let login = typeof (req.body.username) === 'undefined' ? '' : req.body.username
    let password = typeof (req.body.password) === 'undefined' ? '123456' : req.body.password

    let token = utils.getToken(req)
    if (token) {
      let admin = utils.decodeToken(token).payload.data
      User.findOne({login: admin}, (err, doc) => {
        if (doc && doc.type) {
          let user = new User({
            login: login,
            password: password,
            nickname: nickname,
            token: '',
            type: 1
          })
          user.save((error, doc) => {
            if (error) {
              utils.response(res, code.error, error)
            } else {
              utils.response(res, code.success, '添加成员 ' + nickname + ' 成功!')
            }
          })
        } else {
          utils.response(res, code.error, err)
        }
      })
    } else {
      utils.response(res, code.error, '无效的token!')
    }
  })

  apiRouter.post(uri.list, function (req, res) {
    let token = utils.getToken(req)
    if (token) {
      let admin = utils.decodeToken(token).payload.data
      User.findOne({login: admin}, (err, doc) => {
        if (doc && doc.type) {
          User.find({}, {nickname: 1, login: 1}, (err, item) => {
            if (err) {
              utils.response(res, code.error, err)
            } else {
              utils.response(res, code.success, item)
            }
          })
        } else {
          utils.response(res, code.error, err)
        }
      })
    } else {
      utils.response(res, code.error, '无效的token!')
    }
  })
}
