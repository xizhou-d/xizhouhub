const momentService = require('../services/moment.service')

class MomentController {
    async create(ctx, next) {
        // 1. 获取动态的内容
        const { content } = ctx.request.body

        // 2. 动态是谁发布的：（token -> id/name）
        const { id } = ctx.user

        // 3. 将动态相关的数据保存到数据库中
        const result = await momentService.create(id, content)

        ctx.body = {
            code: 0,
            message: '发表动态成功',
            data: result
        }
    }

    async lists(ctx, next) {
        // 1. 获取查询数据
        const { offset, size } = ctx.query
        // 2. 从数据库中查询动态列表
        const values = await momentService.lists(offset, size)

        ctx.body = {
            code: 0,
            message: '获取动态列表成功',
            data: values
        }
    }

    async detail(ctx, next) {
        console.log('ctx.params', ctx.params)
        // 1. 获取动态ID
        const { detailID } = ctx.params

        // 2. 根据 ID 查询动态详情
        const result = await momentService.queryById(detailID)

        ctx.body = {
            code: 0,
            message: '获取动态 id 成功。',
            data: result
        }
    }

    async update(ctx, next) {
        // 1. 获取要修改的动态的ID
        const { momentID } = ctx.params
        // 2. 获取修改的内容
        const { content } = ctx.request.body
        // 3. 执行数据库操作
        const result = await momentService.update(momentID, content)

        ctx.body = {
            code: 0,
            message: '修改成功',
            data: result
        }
    }

    async remove(ctx, next) {
        // 1. 获取要删除的动态的id
        const { momentID } = ctx.params

        // 2. 执行数据库操作
        const result = momentService.remove(momentID) 

        ctx.body = {
            code: 0,
            message: '删除动态成功',
            data: result
        }
    }

    // 为 moment 添加 label
    async addLabels(ctx, next) {
        // 1. 获取一些参数
        const labels = ctx.labels
        const { momentID } = ctx.params

        // 2. 将 moment_id 和 label_id 添加到 moment_label 关系表
        try {
            for (const label of labels) {
                const isExists = await momentService.hasLabel(momentID, label.id)
                // 2.1 判断 moment_id 和 label_id 关系数据 是否已经存在在 moment_label 表中
                if (!isExists) {
                    const result = await momentService.addLabel(momentID, label.id)
                }
            }

            ctx.body = {
                code: 0,
                message: '为动态添加标签成功～'
            }
        } catch (error) {
            ctx.body = {
                code: -3001,
                message: '为动态添加标签失败～'
            }
        }
    }
}

module.exports = new MomentController()