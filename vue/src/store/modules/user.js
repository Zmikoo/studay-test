import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userMsg: {
    name: '',
    code:'',
    userId:'',
    mobile:'',
  },
  currRoute: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERMSG: (state, params) => {
    state.userMsg.name = params.username;
    state.userMsg.code = params.realname;
    state.userMsg.userId = params.id;
    state.userMsg.mobile = params.mobile;
    sessionStorage.setItem('userMsg',JSON.stringify({
      name:params.username,
      code:params.realname,
      userId:params.id,
      mobile:params.mobile
    }))
    console.log(sessionStorage.getItem('userMsg'))
  },
  SET_CURROUTE: (state, currRoute) => {
    state.currRoute = currRoute;
    sessionStorage.setItem('currRoute',currRoute);
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        if (response.data) {         
            commit('SET_TOKEN', response.data.username)
            setToken(response.data.username)
            commit('SET_USERMSG', response.data)
            resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

