# koa_ssr

* node_koa 负责后端api 接口
* vue ssr 部分数据渲染
* https 请求问题 待处理
* 页面包含子组件时 asyncData 子组件方法无效

# 问题记录

``` js
// state 必须是 方法
state: () => {
  return {
    _id: '',
    name: '',
    nickName: '',
    email: '',
    headImg: '',
    token: ''
  }
}
// ssr 写法
export function createStore () {
  return new Vuex.Store({
    modules: {
      app: {
        ...app
      },
      itemList: {
        ...itemList
      }
    }
  })
}
// nuxt 框架写法
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
// asyncData 写法修改 ssr 写法
asyncData ({ store, route, _this, callBack }) {
  return new Promise((resolve, reject) => {
    let _li = store.itemList
    api.item.getList({
      params: {
        key: _li
      }
    }).then((res) => {
      if (res && res.data && res.success) {
        console.log(res.data, '--------------> asyncData')

        // 通过 store.commit 保存到vuex 共享数据
        store.commit('itemList/SET_VALUE', res.data || {})
        resolve(res.data)
      } else {
        resolve({})
      }
    })
  })
}
// nuxt 写法 手动调用 callback
async asyncData ({ store, route, _this, params }, callback) {
  let _li = store.itemList
  let res = await api.item.getList({
    params: {
      key: _li
    }
  })
  let _R = {}
  if (res && res.data && res.success) {
    console.log(res.data, '--------------> asyncData')
    _R = { itemList: res.data }
  } else {
    _R = { itemList: {} }
  }
  callback(null, _R)
  return _R
}
export default store
```
