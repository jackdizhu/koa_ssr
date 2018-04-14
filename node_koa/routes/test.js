const router = require('koa-router')()
const userModel = require('../models/user')
// const util = require('util')
const jwt = require('jsonwebtoken')
// 解密
// const verify = util.promisify(jwt.verify)
// 加盐 key
const secret = 'lqwiuerpowjflaskdjffkhgoiwurpoqdjlsakjflsdkf'

router.prefix('/users')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  // let users = await userModel.find({name: 'jackdizhu'})
  ctx.body = {
    title: 'koa2 json'
  }
})
// 添加记录
router.get('/add', async (ctx, next) => {
  let user = await userModel.insert({
    name: 'jackdizhu',
    password: 'password',
    email: '',
    phone: '',
    ext: {
      nick_name: 'nick_name',
      head_img: 'head_img'
    }
  })
  ctx.body = {
    title: 'add',
    user: user
  }
})
// 查找记录
router.get('/find', async (ctx, next) => {
  let users = await userModel.find({name: 'jackdizhu'})
  ctx.body = {
    title: 'find',
    users: users
  }
})
// 修改记录
router.get('/edit', async (ctx, next) => {
  let _user = await userModel.findOne({name: 'jackdizhu'})
  _user._id = _user._id.toString()
  _user.password = 'password1'
  // let R =
  await userModel.update(_user)
  let user = await userModel.findOne({name: 'jackdizhu'})
  ctx.body = {
    title: 'edit',
    user: user
  }
})
// 登录
router.get('/login', async (ctx, next) => {
  let user = await userModel.findOne({name: 'jackdizhu', password: 'password'})
  let token = ''
  if (user) {
    // 登录成功
    let userToken = {
      name: user.name
    }
    // token签名 有效期为1小时
    token = jwt.sign(userToken, secret, {expiresIn: '1h'})
  }
  ctx.body = {
    title: 'login',
    user: user,
    token: token
  }
})
// token
router.get('/token', async (ctx, next) => {
  const decodedToken = ctx.state.decodedToken
  const token = ctx.state.token
  ctx.body = {
    obj: {
      token: token,
      _token: decodedToken
    }
  }
})

module.exports = router
