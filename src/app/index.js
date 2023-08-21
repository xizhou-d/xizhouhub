/**
 * 引入第三方库
 */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

/**
 * 本地引入
 */
// const userRouter = require('../router/user.router.js')
// const loginRouter = require('../router/login.router.js')
const { registerRouters } = require('../router/index')

/**
 * app
 */
const app = new Koa()

app.use(bodyParser())
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())
// app.use(loginRouter.routes())
// app.use(userRouter.allowedMethods())

registerRouters(app)

module.exports = app