const { NAME_OR_PASSWORD_IS_REQUIRED, USERNAME_ALREADY_EXISTS } = require('../config/error-constants')
const userService = require('../services/user.service')
const md5Password = require('../utils/md5-password')

const verifyUser = async (ctx, next) => {
    // 1. 获取用户传递过来的信息
    // 2. 将 user 信息存储到数据库中, 拼接 statement
    // 2.1 验证用户名和密码是否为空
    const {username, password} = ctx.request.body
    if (!username || !password) {
        return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    }
    // 2.2 判断 username 在数据库中是否已经存在
    const users = await userService.findUserByName(username)
    if (users.length) {
        return ctx.app.emit('error', USERNAME_ALREADY_EXISTS, ctx)
    }
    await next()
}

const handlePassword = async (ctx, next) => {
    // 1. 取出密码
    const { password } = ctx.request.body;
    // 2. 对密码进行加密
    ctx.request.body.password = md5Password(password)
    // 3. 执行下一个中间件
    await next() 
}
 
module.exports = {
    verifyUser,
    handlePassword
}