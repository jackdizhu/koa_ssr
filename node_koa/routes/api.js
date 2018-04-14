const router = require('koa-router')()
const Mock = require('mockjs')

const jwt = require('jsonwebtoken')
const util = require('util')
const sendMail = require('../com/sendMail')
// 自定义 日志打印
// const log = require('./com/log')()
// 解密
const verify = util.promisify(jwt.verify)
// 加盐 key
const secret = 'lqwiuerpowjflaskdjffkhgoiwurpoqdjlsakjflsdkf'

router.prefix('/api')

let forReqFn = (obj, _get, _post) => {
  Object.keys(obj).forEach(item => {
    if (typeof obj[item] === 'object') {
      forReqFn(obj[item], _get, _post)
    } else if (typeof obj[item] === 'function') {
      obj[item] = obj[item](_get, _post)
    }
  })
}

router.get('/log', async (ctx, next) => {
  let _obj = {
    obj: {
      code: '1',
      msg: 'ok',
      _get: function (_get, _post) {
        return _get
      }
    }
  }

  forReqFn(_obj, ctx.query, ctx.request.body)
  ctx.body = Mock.mock(_obj)

  // 打印日志
  log(ctx.body)
})

router.get('/ssr_get', async (ctx, next) => {
  let _obj = {
    'success': true,
    'data': {
      '_id': '5aa880ecdfd6d80818050d81',
      'ext': {
        'nick_name': 'nick_name',
        'head_img': 'head_img'
      },
      'phone': '13011112222',
      'email': '130@qq.com',
      'date': 1520992492927,
      'password': '47012e7a0282f43c1be9c587bdf52178',
      'name': 'jack',
      '__v': 0
    }
  }

  forReqFn(_obj, ctx.query, ctx.request.body)
  ctx.body = Mock.mock(_obj)
})

router.post('/ssr_post', async (ctx, next) => {
  let _obj = {
    'success': true,
    'data': {
      '_id': '5aa880ecdfd6d80818050d81',
      'ext': {
        'nick_name': 'nick_name',
        'head_img': 'head_img'
      },
      'phone': '13011112222',
      'email': '130@qq.com',
      'date': 1520992492927,
      'password': '47012e7a0282f43c1be9c587bdf52178',
      'name': 'jack',
      '__v': 0
    }
  }

  forReqFn(_obj, ctx.query, ctx.request.body)
  ctx.body = Mock.mock(_obj)
})

router.get('/sendMail', async (ctx, next) => {
  sendMail({
    to: '376365334@qq.com',
    subject: '测试邮件标题',
    html: '<h1>测试邮件内容</h1>'
  })
  let _obj = {
    obj: {
      code: '1',
      msg: 'ok',
      _get: function (_get, _post) {
        return _get
      }
    }
  }

  forReqFn(_obj, ctx.query, ctx.request.body)
  ctx.body = Mock.mock(_obj)
})

router.get('/', async (ctx, next) => {
  let userToken = {
    name: 'user.name'
  }
  // token签名 有效期为1小时
  const token = jwt.sign(userToken, secret, { expiresIn: '1h' })
  // ctx.request.header['token'] = token
  // ctx.res.setHeader('token', token)
  ctx.cookies.set('token', token)
  let _obj = {
    obj: {
      token: token,
      code: '1',
      msg: 'ok',
      _get: function (_get, _post) {
        return _get
      }
    }
  }

  forReqFn(_obj, ctx.query, ctx.request.body)
  ctx.body = Mock.mock(_obj)
})
router.post('/', async (ctx, next) => {
  let _obj = {
    obj: {
      code: '1',
      msg: 'ok',
      _post: function (_get, _post) {
        return _post
      }
    }
  }
  console.log(ctx.request.body)

  forReqFn(_obj, ctx.query, ctx.request.body)
  ctx.body = Mock.mock(_obj)
})
router.get('/token', async (ctx, next) => {
  const token = 'Bearer ' + (ctx.header.authorization || ctx.query.token || ctx.request.body.token || ctx.cookies.get('token') || '')
  let payload
  if (token) {
    try {
      // 解密，获取payload
      payload = await verify(token.split(' ')[1], secret)
    } catch (error) {
      payload = 'err'
    }
    ctx.body = {
      obj: {
        token: payload,
        _token: token
      }
    }
  } else {
    ctx.body = {
      obj: {
        message: 'token 错误',
        code: -1,
        _token: token
      }
    }
  }
})

module.exports = router
