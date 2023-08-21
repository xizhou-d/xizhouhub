const labelService = require('../services/label.service')

class LabelController {
    async create(ctx, next) {
        // 1. 获取标签名称
        const { name } = ctx.request.body 

        // 2. 操作数据库存储 name
        const result = await labelService.create(name)

        ctx.body = {
            code: 0,
            message: '添加标签成功',
            data: result
        }
    }
}

module.exports = new LabelController()