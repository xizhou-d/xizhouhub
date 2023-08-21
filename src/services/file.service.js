const connection = require('../app/database')

class FileService {
    async create(id, filename, mimetype, size) {
        const statement = 'INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);'
        const [result] = await connection.execute(statement, [filename, mimetype, size, id])
        return result
    }

    async queryAvatarByUserId(userId) {
        const statement = `SELECT * FROM avatar WHERE user_id = ?;`
        const [result] = await connection.execute(statement, [userId])
        console.log('rereerere', result)
        // 用户可能上传多张图片，取最新的（最后一张图片）
        return result.pop()
    }
}

module.exports = new FileService()