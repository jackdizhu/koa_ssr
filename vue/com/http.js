import axios from 'axios'
import conf from '../config'
// import storage from './com.js'
// import { Message } from 'element-ui'

axios.defaults.timeout = 1000 * 60 * 60
// axios.defaults.baseURL = 'http://127.0.0.1:8000/mock/5a522f2eb9574d08787bf76a/app1'
axios.defaults.baseURL = `${conf.host}`
// axios.defaults.withCredentials = true // 带cookie 请求
// axios.defaults.httpsAgent = new https.Agent({
//   rejectUnauthorized: false
// })

var qs = require('qs')

/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res)
    }, err => {
      reject(err)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data)).then(res => {
      resolve(res)
    }, err => {
      reject(err)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * request 请求方法
 * @param obj {  url, params, type }
 * @returns {Promise}
 */
function request (obj) {
  // let token = storage.getItem('token') || ''
  let token = 'token'
  let { url, params, type } = obj
  // 增加该 header 值不是简单请求 会发起 options 请求
  // axios.defaults.headers['Authorization'] = token
  params.token = token // 是简单请求
  axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

  return new Promise((resolve, reject) => {
    let fn = null
    if (type === 'POST') {
      fn = post
    } else {
      fn = get
    }
    fn(url, params).then(function (res) {
      let data = res.data || {}
      // console.log(data)

      resolve(data)
    }).catch(err => {
      console.log(err, 'request catch')
      resolve({err: err})
    })
  })
}

/*
  this.$requestAll([
    this.$request({
      url: this.$api.mock,
      type: 'GET',
      params: {}
    }),
    this.$request({
      url: this.$api.mock,
      type: 'POST',
      params: {}
    })
  ]).then((arg) => {
    console.log(arg, '--requestAll--')
  })
 */
function requestAll (_requestArr) {
  return new Promise((resolve, reject) => {
    axios.all(_requestArr)
      .then(axios.spread(function (...params) {
        resolve(params)
      })).catch(err => {
        console.log(err, 'requestAll catch err')
        resolve({ err: 'requestErr' })
        // reject(err) // 返回错误
      })
  })
}

export { request, requestAll }
