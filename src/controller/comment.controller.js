const commentService = require('../services/comment.service')

class CommentController {
    async create(ctx, next) {
        // 1. 获取 body 中的参数
        const { content, momentID } = ctx.request.body
        const { id } = ctx.user

        // 2. 操作数据库，将数据进行存储
        const result = await commentService.create(content, momentID, id)
        ctx.body = {
            code: 0,
            message: '发表评论成功',
            data: result
        }
    }

    async reply(ctx, next) {
        // 1. 获取 body 中的参数
        const { content, momentID, commentID } = ctx.request.body
        const { id } = ctx.user

        console.log('content, momentID, commentID, id', content, momentID, commentID, id)

        // 2. 操作数据库，将数据进行存储
        const result = await commentService.reply(content, momentID, commentID, id)
        ctx.body = {
            code: 0,
            message: '回复评论成功',
            data: result
        } 
    }
}

module.exports = new CommentController()