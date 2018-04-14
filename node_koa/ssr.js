const { Nuxt, Builder } = require('nuxt')

async function start() {
  const NuxtConfig = require('./nuxt.config.js')
  var app = require('./app');
  var config = require('./config');

  NuxtConfig.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(NuxtConfig)

  // Build in development
  if (NuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(config.port, config.host)
  console.log('Server listening on ' + config.host + ':' + config.port) // eslint-disable-line no-console
}

start()
