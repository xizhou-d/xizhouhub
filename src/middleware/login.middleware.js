const jwt = require('jsonwebtoken')
const { publicKey } = require('../config/secret')
const { NAME_OR_PASSWORD_IS_REQUIRED, USERNAME_NOT_EXISTS, PASSWORD_IS_INCORRECT, UNAUTHORIZED } = require('../config/error-constants')
const userService = require('../services/user.service')
const md5Password = require('../utils/md5-password')

const verifyLogin = async (ctx, next) => {
    const { username, password } = ctx.request.body

    // 1. 查询用户名和密码是否为空
    if (!username || !password) {
        return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    }

    // 2. 查询该用户是否在数据库中存在
    const users = await userService.findUserByName(username)
    if (users.length === 0) {
        return ctx.app.emit('error', USERNAME_NOT_EXISTS, ctx)
    }

    // 3. 查询数据库中的密码和用户传递的密码是否一样
    if (users[0].password !== md5Password(password)) {
        return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)
    }

    // 4. 如果账号密码都正确，将 user 信息保存在 ctx 中
    ctx.user = users[0]

    await next()
}

const verifyAuth = async (ctx, next) => {
    // 1. 获取 token
    const authorization = ctx.headers.authorization
    if (!authorization) {
        return ctx.app.emit('error', UNAUTHORIZED, ctx)
    }
    const token = authorization.replace('Bearer ', '')

    // 2. 验证 token 是否有效
    try {
        const result = jwt.verify(token, publicKey, {
            algorithms: ['RS256']
        })
        ctx.user = result
        
        await next()
    } catch (error) {
        console.log('error', error)
        return ctx.app.emit('error', UNAUTHORIZED, ctx)
    }
}

module.exports = {
    verifyLogin,
    verifyAuth
}