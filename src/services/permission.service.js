const connection = require('../app/database')

class PermissionService {
    async checkModifyMomentPermission(momentID, id) {
        const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`
        const [values] = await connection.execute(statement, [momentID, id])
        return !!values.length
    }

    async checkSource(resourceName, resourceId, userId) {
        console.log('resourceName, resourceId, userId', resourceName, '***', resourceId, '***', userId)
        const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`
        const [values] = await connection.execute(statement, [resourceId, userId])
        return !!values.length
    }
}

module.exports = new PermissionService()