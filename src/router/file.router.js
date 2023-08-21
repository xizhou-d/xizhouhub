const KoaRouter = require('@koa/router')
const fileRouter = new KoaRouter({ prefix: '/file' })

const { verifyAuth } = require('../middleware/login.middleware')
const { handleAvatar } = require('../middleware/file.middleware')
const { create } = require('../controller/file.controller')

fileRouter.post('/avatar', verifyAuth, handleAvatar, create)

module.exports = fileRouter