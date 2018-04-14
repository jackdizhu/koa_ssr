import Vue from 'vue'
import Vuex from 'vuex'

import itemList from './modules/itemList'
import app from './modules/app'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    app: {
      ...app
    },
    itemList: {
      ...itemList
    }
  }
})
export default store

// export function createStore () {
//   return new Vuex.Store({
//     modules: {
//       app: {
//         ...app
//       },
//       itemList: {
//         ...itemList
//       }
//     }
//   })
// }
