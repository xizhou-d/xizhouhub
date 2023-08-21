const labelService = require('../services/label.service')

/**
 * 传入 labels 时，不确定 labels 中是否有 labels 已经存在在 label 表中
 * 所以需要判断，如果不存在在 label 表中，那么需要将 label 添加到 labels 中
 * 
 */
const verifyLabelExist = async (ctx, next) => {
    // 1. 获取传递过来的 labels(数组)
    const { labels } = ctx.request.body
    // 2. 判断所有的 labels 中的 name 是否已经存在于 label 表
    const newLabels = []
    for (const name of labels) {
        const result = await labelService.queryLabelByname(name)
        const labelObj = { name }
        if (result) { // 获取label对应的 id
            labelObj.id = result.id
        } else { // 插入 name，并获取插入 name 之后的 id.
            const insertResult = await labelService.create(name)
            labelObj.id = insertResult.insertId
        }

        newLabels.push(labelObj)
    }

    ctx.labels = newLabels

    await next()
}

module.exports = {
    verifyLabelExist
}