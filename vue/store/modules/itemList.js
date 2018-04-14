export default {
  namespaced: true,
  state: () => {
    return {
      _id: '',
      name: '',
      nickName: '',
      email: '',
      headImg: '',
      token: ''
    }
  },
  mutations: {
    SET_VALUE (state, payload) {
      state._id = payload._id
      state.name = payload.name
      state.nickName = payload.nick_name
      state.email = payload.email
      state.headImg = payload.head_img
      state.token = payload.token
    }
  },
  actions: {
    set_value ({ commit, state, rootState }, data) {
      commit('SET_VALUE', data)
    }
  },
  getters: {
    getItemId (state) {
      return state._id
    }
  }
}
