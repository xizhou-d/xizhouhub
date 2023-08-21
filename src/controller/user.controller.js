const fs = require('fs')
const userService = require('../services/user.service')
const fileService = require('../services/file.service')
const { UPLOAD_PATH } = require('../config/path')

class UserController {
    async create(ctx, next) {
        
        const result = await userService.create(ctx.request.body)
        // 3.查看存储的结果，告知前端创建成功
        ctx.body = {
            message: '创建用户成功',
            data: result
        }
    }

    async showAvatar(ctx, next) {
        // 1. 获取用户的 id
        const { userId } = ctx.params

        // 2. 获取 userId 对应的头像信息
        const avatarInfo = await fileService.queryAvatarByUserId(userId)
        // 3. 读取头像所在的文件
        const { filename, mimetype} = avatarInfo
        // 此处必须设置类型，如果不设置，浏览器不知道是什么类型的文件，不知道如何展示，会直接下载
        ctx.type = mimetype
        console.log('mimetye', mimetype)
        ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
        // ctx.body = {
        //     code: 0,
        //     message: '访问用户头像成功～',
        //     data: result
        // }
    }
}

module.exports = new UserController()