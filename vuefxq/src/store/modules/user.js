import apis from '@/api/api'

const user = {
  state: {
    userId: '',
    userName: '',
    userInfo: '',
  },
  mutations: {
    SET_USER: (state) => {
      state.userId = window.localStorage.getItem('userId') || ''
      state.userName = window.localStorage.getItem('userName') || ''
      state.userInfo = window.localStorage.getItem('userInfo') || ''
    }
  },
  actions: {
    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        apis.myApi.login.userInfo()
          .then(data => {
            window.localStorage.setItem('roleInfo', JSON.stringify(data.result.roleList))
            commit('SET_USER')
            resolve(data)
          }).catch(error => {
            reject(error)
          })
      })
    }
  }
}
export default user