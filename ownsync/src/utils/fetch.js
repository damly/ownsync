import axios from 'axios'
import store from '../store'
// import { MessageBox } from 'mint-ui'
//
// 创建axios实例
const service = axios.create({
  baseURL: '/',     // api的base_url
  timeout: 5000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['Token'] = store.getters.token // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 20000) {
      // MessageBox.alert('手机号或者密码错误!').then(action => {
      //   store.dispatch('FedLogOut').then(() => {
      //     location.reload()
      //   })
      // })

      return Promise.reject(res.data)
    } else {
      return response.data
    }
  },

  error => {
    return Promise.reject(error)
  }
)

export default service
