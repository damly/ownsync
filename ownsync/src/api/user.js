import fetch from '../utils/fetch'
var uri = require('../../server/api').ApiUser

export function userLogin (username, password) {
  const data = {
    username,
    password
  }

  console.log(data)

  return fetch({
    url: uri.login,
    method: 'post',
    data
  })
}

export function userLogout () {
  return fetch({
    url: uri.logout,
    method: 'post'
  })
}

export function userUpdate (data) {
  return fetch({
    url: uri.update,
    method: 'post',
    data
  })
}

export function userAdd (data) {
  return fetch({
    url: uri.add,
    method: 'post',
    data
  })
}

export function userList () {
  return fetch({
    url: uri.list,
    method: 'post'
  })
}
