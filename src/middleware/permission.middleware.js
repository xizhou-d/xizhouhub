const permissionService = require('../services/permission.service')
const { OPERATION_WITHOUT_PERMISSION } = require('../config/error-constants')

const verifyMomentPermission = async (ctx, next) => {
    // 1. 获取登陆用户 id, 修改动态 id
    const { momentID } = ctx.params
    const { id } = ctx.user

    // 2. 查询 user_id 是否有修改 momentID 的权限
    const isPermission = await permissionService.checkModifyMomentPermission(momentID, id)

    if (!isPermission) {
        return ctx.app.emit('error', OPERATION_WITHOUT_PERMISSION, ctx)
    }

    await next()
} 

const verifyPermission = async (ctx, next) => {
    // 1. 获取登陆用户 id, 修改动态 id
    const { id } = ctx.user

    // 2. 获取资源的 name/id
    // name => moment/user/comment/label
    // params => { momentID: 4 }
    // keyName => momentId

    const keyName = Object.keys(ctx.params)[0]
    const resourceName = keyName.replace('ID', '')
    const resourceId = ctx.params[keyName]

    // 2. 查询 user_id 是否有修改 momentID 的权限
    const isPermission = await permissionService.checkSource(resourceName, resourceId, id)

    if (!isPermission) {
        return ctx.app.emit('error', OPERATION_WITHOUT_PERMISSION, ctx)
    }

    await next()
} 

module.exports = {
    verifyMomentPermission,
    verifyPermission
}