// const { Nuxt, Builder } = require('nuxt')
// const NuxtConfig = require('./nuxt.config.js')
const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
const koaJwt = require('koa-jwt')
const path = require('path')
// const jwt = require('jsonwebtoken')
// const util = require('util')
// 解密
// const verify = util.promisify(jwt.verify)
// 加盐 key
const secret = 'lqwiuerpowjflaskdjffkhgoiwurpoqdjlsakjflsdkf'

const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const error = require('koa-error')
// form-data 不支持  x-www-form-urlencoded 改为
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const api = require('./routes/api')

// 自定义 日志打印
const _log = require('./com/log')
global.log = _log()

// error handler
onerror(app)

// api 服务器 允许跨域
app.use(cors({
  // Access-Control-Allow-Origin
  origin: function(ctx) {
    // if (ctx.url === '/test') {
    //   return false;
    // }
    return '*'
  },
  // Access-Control-Expose-Headers 哪些Headers可以作为响应的一部分暴露出去
  // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  // Access-Control-Max-Age 有效期秒数 60 * 60 * 24
  maxAge: 60,
  // Access-Control-Allow-Credentials 客户端携带证书访问
  // credentials: true,
  // Access-Control-Allow-Methods
  allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  // Access-Control-Allow-Headers
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.use(logger())
app.use(require('koa-static')(path.resolve(__dirname, '/public')))

app.use(views(path.resolve(__dirname, '/views'), {
  extension: 'ejs'
}))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text', 'multipart']
}))

/**
 * 错误捕捉中间件
 */
// app.use(async (ctx, next) => {
//   try {
//     ctx.error = (code, message) => {
//       if (typeof code === 'string') {
//         message = code
//         code = 500
//       }
//       ctx.throw(code || 500, message || '服务器错误')
//     }
//     await next();
//   } catch (e) {
//     let status = e.status || 500
//     let message = e.message || '服务器错误'
//     ctx.response.body = { status, message }

//   }
// })

// token 验证 js req header authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlci5uYW1lIiwiaWF0IjoxNTE2Nzg3MDU0LCJleHAiOjE1MTY3OTA2NTR9.gEIBKKqhEQ_slW0BmSK-3pnaXxYFaOSOJonLb3Xc6n0"
// decodedToken 解密后(数据)key tokenKey 原始(token)key
// 处理 token 验证失败返回
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.body = ctx.body || {}
      // ctx.status = 200
      ctx.body.path = ctx.path
      ctx.body.query = ctx.query
      ctx.body.body = ctx.request.body
      ctx.body._req = ctx.request
      ctx.body._res = ctx.response
      // ctx.body.error = err.originalError ? err.originalError.message : err.message
      ctx.body.error = 'Authentication Failed'
      ctx.body.apiV = '1.0'
    }
  })
})
app.use(koaJwt(
  {
    secret,
    key: 'decodedToken',
    tokenKey: 'token',
    getToken: (ctx) => {
      let _token = (ctx.header.authorization || ctx.query.token || (ctx.request.body && ctx.request.body.token) || ctx.cookies.get('token') || '')
      log(ctx.request.body)

      return _token
    }
  }
).unless({
  // 数组中的路径不需要通过jwt验证
  // /^\/file_v[0-9]\/[a-zA-Z]+/,
  method: ['OPTIONS'],
  path: [
    /^\/$/,
    /^\/favicon.ico$/,
    /^\/api/,
  ]
}))

// 错误处理模块
// app.use(error())
app.use(json())

// app.use(async (ctx, next) => {
//   await next()
//   // 设置 header
//   ctx.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8;')
//   // 设置 服务器支持的 头信息字段
//   ctx.set("Access-Control-Allow-Headers", "authorization,Content-Type")
//   // 设置 预检请求的有效期 OPTIONS 20 天
//   ctx.set("Access-Control-Max-Age", 1728000)
//   // 设置是否允许发送 cookie
//   // ctx.set("Access-Control-Allow-Credentials", true)
// })


// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes

// 针对 401 token 验证失败 没有返回问题
// app.use(async (ctx, next) => {
//   await next()
//   // 处理 !==200 错误
//   if (ctx.response.status !== 401) {
//     ctx.body = {
//       obj: {
//         res_code: '-9',
//         msg: 'Authentication Failed'
//       }
//     }
//   }
// })

// 针对 /api 的中间件
app.use(async (ctx, next) => {
  await next()
  if (/^\/api\//.test(ctx.path)) {
    // 处理 !==200 错误
    if (ctx.response.status !== 200) {
      ctx.body = {
        obj: {
          res_code: '0',
          msg: 'ok'
        }
      }
    }

    if (ctx.body) {
      ctx.body.path = ctx.path
      ctx.body.query = ctx.query
      ctx.body.body = ctx.request.body
      ctx.body._req = ctx.request
      ctx.body._res = ctx.response
      ctx.body.apiV = '1.0'
    }
  }
})
// app.use(async (ctx, next) => {
//   await next()
// })

// app.use(index.routes(), index.allowedMethods())
app.use(api.routes(), api.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  log({ err, ctx }, 'error')

  ctx.body = err
})

// 我们用这些选项初始化 Nuxt.js：
// const nuxt = new Nuxt(NuxtConfig)
// // 生产模式不需要 build
// if (!NuxtConfig.dev) {
//   const builder = new Builder(nuxt)
//   builder.build()
// }
// app.use(nuxt.render)

module.exports = app
