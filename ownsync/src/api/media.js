import fetch from '../utils/fetch'
var uri = require('../../server/api').ApiMedia

export function mediaUpload () {
  return fetch({
    url: uri.upload,
    method: 'post'
  })
}

export function mediaList () {
  return fetch({
    url: uri.list,
    method: 'post'
  })
}
