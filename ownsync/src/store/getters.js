const getters = {
  token: state => state.user.token,
  nickname: state => state.user.nickname,
  type: state => state.user.type
}
export default getters
