const connection = require('../app/database')
// 操作数据库 
class UserService {
    async create(user) {
        // 1. 获取用户 user
        const {username, password} = user
        // 2. 拼接 statement
        const statement = 'INSERT INTO `users` (username, `password`) VALUES (?, ?);'
        // 3. 执行 statement
        const [result] = await connection.execute(statement, [username, password])
        return result
    }

    async findUserByName(name) {
        const statement = 'SELECT * FROM `users` WHERE username = ?;'

        const [values] = await connection.execute(statement, [name])
        return values
    }

    async updateUsersAvatarUrl(avatar_url, userId) {
        const statement = 'UPDATE users SET avatar_url = ? WHERE id = ?;';
        const [result] = await connection.execute(statement, [avatar_url, userId])
        return result
    }
}

module.exports = new UserService()