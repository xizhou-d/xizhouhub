const { create } = require('../services/file.service')
const { updateUsersAvatarUrl } = require('../services/user.service')
const { SERVER_HOST, SERVER_PORT } = require('../config/server')

class FileController {
    async create(ctx, next) {
        // 1. 获取文件对应的信息
        const { filename, mimetype, size } = ctx.request.file
        const { id } = ctx.user

        // 2. 将图片信息和 id 结合起来进行存储
        const result = await create(id, filename, mimetype, size)
        // 3. 文件上传成功后，同步更新 users 表 avatar_url 字段
        const avatar_url = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
        const result2 = await updateUsersAvatarUrl(avatar_url, id)
        ctx.body = {
            code: 0,
            message: '头像上传成功～',
            data: avatar_url
        }
    }
}

module.exports = new FileController() 