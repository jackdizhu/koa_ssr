// import { version } from '../../../package.json'
export default {
  namespaced: true,
  state: () => {
    return {
      version: 'version',
      readChangelog: false
    }
  },
  mutations: {
    SET_READ_CHANGELOG (state, payload) {
      state.readChangelog = payload
    }
  },
  actions: {
    SET_READ_CHANGELOG ({ commit }, state) {
      commit('SET_READ_CHANGELOG', state)
    }
  }
}
