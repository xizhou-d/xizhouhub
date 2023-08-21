const connection = require('../app/database')

class CommentService {
    async create(content, momentID, id) {
        console.log(11111111, content, momentID, id)
        const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`

        const [result] = await connection.execute(statement, [content, momentID, id])
        console.log('result', result)
        return result
    }

    async reply(content, momentID, commentID, id) {
        const statement = `INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?, ?, ?, ?);`

        const [result] = await connection.execute(statement, [content, momentID, commentID, id])
        console.log('result', result)
        return result
    }
}

module.exports = new CommentService()