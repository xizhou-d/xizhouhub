const jwt = require('jsonwebtoken')

const { privateKey, publicKey } = require('../config/secret')
const { UNAUTHORIZED } = require('../config/error-constants')

class LoginController {
    sign(ctx, next) {
        // 1. 获取用户信息
        const { id, name } = ctx.user

        // 2. 颁发令牌，token
        const token = jwt.sign({ id, name }, privateKey, {
            algorithm: 'RS256',
            expiresIn: 24 * 60 * 60
        })

        // 4. 颁发令牌，传入 token
        ctx.body = { code: 0, data: { id, name, token } }
    }

    test(ctx, next) {
        ctx.body = '用户验证成功'
    }
}

module.exports = new LoginController()