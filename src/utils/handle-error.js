const app = require('../app')
const { NAME_OR_PASSWORD_IS_REQUIRED,
    USERNAME_ALREADY_EXISTS,
    USERNAME_NOT_EXISTS,
    PASSWORD_IS_INCORRECT,
    UNAUTHORIZED,
    OPERATION_WITHOUT_PERMISSION
} = require('../config/error-constants')

app.on('error', (err, ctx) => {
    let errCode = 0
    let message = ''

    switch (err) {
        case NAME_OR_PASSWORD_IS_REQUIRED:
            errCode = -1001
            message = '用户名和密码不能为空！'
            break
        case USERNAME_ALREADY_EXISTS:
            errCode = -1002,
                message = '当前用户已经存在！'
            break
        case USERNAME_NOT_EXISTS:
            errCode = -1003,
                message = '用户名不存在，请注册用户～'
            break
        case PASSWORD_IS_INCORRECT:
            errCode = -1004,
                message = '密码错误，请输入正确的密码～'
            break
        case UNAUTHORIZED:
            errCode = -1005,
                message = '无效的 token，或者 token 已经过期'
            break
        case OPERATION_WITHOUT_PERMISSION:
            errCode = -2001,
                message = '没有操作该资源的权限.'
            break
    }

    ctx.body = { errCode, message }
})