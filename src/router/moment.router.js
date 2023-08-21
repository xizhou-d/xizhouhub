const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create, lists, detail, update, remove, addLabels } = require('../controller/moment.controller')
const { verifyMomentPermission, verifyPermission } = require('../middleware/permission.middleware')
const { checkModifyMomentPermission } = require('../services/permission.service')
const { verifyLabelExist } = require('../middleware/label.middleware')

const momentRouter = new KoaRouter({ prefix: '/moment' })

// 接口
// 1. 增加
momentRouter.post('/', verifyAuth, create)
// 2. 查询
momentRouter.get('/lists', lists)
momentRouter.get('/:detailID', detail)
// 3. 删除
// momentRouter.delete('/:momentID', verifyAuth, verifyMomentPermission, remove)
// 4. 修改
// 验证：只有登陆的用户才能修改
// momentRouter.patch('/:momentID', verifyAuth, verifyMomentPermission, update)

// 5. 动态获取权限
momentRouter.delete('/:momentID', verifyAuth, verifyPermission, remove)
momentRouter.patch('/:momentID', verifyAuth, verifyPermission, update)

// 6. 添加标签
/**
 * 中间件：
 * 1. 是否登陆
 * 2. 是否有操作当前动态的权限
 * 3. 额外的中间件，验证当前传递过来的 label 是否已经存在于 label 表中
 *  * 如果存在，那么直接使用即可；
 *  * 如果不存在，需要先将传递过来的 label 的 name 添加到 label 表中
 * 4. 最终步骤
 *  * 所有的 labels 都已经在 label 表中
 *  * 动态 2， 和 labels 关系，将关系添加到表中
 */
momentRouter.post('/:momentID/labels', verifyAuth, verifyPermission, verifyLabelExist, addLabels)

module.exports = momentRouter               