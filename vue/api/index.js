import axios from 'axios'
import iView from 'iview'
import conf from '../config'
import Cookies from 'universal-cookie'
// import { serverCookies } from '../entry/server'
import { request } from '../com/http'

// 保存路由信息
let router = null
const cookies = new Cookies()
const isClient = process.env.VUE_ENV === 'client'
const instance = axios.create({
  baseURL: isClient ? '/mock' : `${conf.host}`,
  timeout: conf.timeout
})

const loading = {
  count: 0,
  isLoading: false,
  start () {
    this.count += 1
    if (!this.isLoading) {
      setTimeout(() => {
        if (!this.isLoading && this.count > 0) {
          this.isLoading = true
          this.checkLoading()
        }
      }, 1000)
    }
  },
  cancel () {
    this.count -= 1
    if (this.count <= 0) {
      this.done()
    }
  },
  done () {
    this.count = 0
    this.isLoading = false
    iView.LoadingBar.finish()
  },
  checkLoading () {
    const el = document.querySelector('.ivu-loading-bar')
    if (this.isLoading && !el) {
      iView.LoadingBar.start()
    }
  }
}

instance.interceptors.request.use(
  (config) => {
    let token
    if (isClient) {
      loading.start()
      token = cookies.get(conf.storageNamespace + 'token')
    } else {
      token = serverCookies.get(conf.storageNamespace + 'token')
    }
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  (res) => {
    if (isClient) loading.cancel()
    Promise.reject(res)
  },
  (error) => {
    if (isClient) loading.cancel()
    Promise.reject(error)
  }
)

const initAPI = _router => {
  router = _router
}
const createAPI = (url, method, config) => {
  config = config || {}
  return instance({
    url,
    method,
    ...config
  })
}

const item = {
  getList: config => request({
    url: '/ssr_get',
    type: 'GET',
    params: config
  })
}
const item2 = {
  getList: config => request({
    url: '/ssr_get',
    type: 'GET',
    params: config
  })
}

export {
  item,
  item2,
  initAPI,
  createAPI
}
