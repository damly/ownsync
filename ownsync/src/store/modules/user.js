import { userLogin, userLogout, userUpdate, userAdd, userList } from '../../api/user'
import Cookies from 'js-cookie'

const user = {
  state: {
    login: '',
    token: Cookies.get('sync-token'),
    nickname: '',
    type: 0
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_TYPE: (state, type) => {
      state.type = type
    }
  },

  actions: {

    Login ({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        userLogin(username, userInfo.password).then(response => {
          const data = response.data
          console.log('response', data)
          Cookies.set('sync-token', response.data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_NICKNAME', data.nickname)
          commit('SET_TYPE', data.type)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({commit}) {
      return new Promise((resolve, reject) => {
        userLogout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Cookies.remove('sync-token')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    UserUpdate ({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        userUpdate(userInfo).then(() => {
          commit('SET_NICKNAME', userInfo.nickname)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    AddUser ({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        userAdd(userInfo).then(response => {
          console.log('response', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    ListUsers ({commit}) {
      return new Promise((resolve, reject) => {
        userList().then(response => {
          console.log('response', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        Cookies.remove('sync-token')
        resolve()
      })
    }
  }
}

export default user
