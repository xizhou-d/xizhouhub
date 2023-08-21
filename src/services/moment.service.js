const connection = require('../app/database')

class MomentService {
    async create(user_id, content) {
        const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`

        const [result] = await connection.execute(statement, [user_id, content])
        return result
    }

    async lists(offset = 0, size = 5) {
        const statement = `
            SELECT
            m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
            JSON_OBJECT('id', u.id, 'name', u.username, 'avatarUrl', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
            (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) comment_count,
            (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) label_count
            FROM moment m
            LEFT JOIN users u ON u.id = m.user_id
            LIMIT ? OFFSET ?;
        `

        const [values] = await connection.execute(statement, [size, offset])
        return values
    }

    async queryById(id) {
        const statement = `
            SELECT
                m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
                JSON_OBJECT('id', u.id, 'name', u.username, 'avatarUrl', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
                (
                    SELECT
                        JSON_ARRAYAGG(JSON_OBJECT(
                            'id', c.id, 'content', c.content, 'commentID', c.comment_id,
                            'user', JSON_OBJECT('id', cu.id, 'name', cu.username, 'avatarUrl', cu.avatar_url)
                        ))
                    FROM comment c
                    LEFT JOIN users cu ON cu.id = c.user_id
                    WHERE m.id = c.moment_id
                ) comments,
                JSON_ARRAYAGG(JSON_OBJECT(
                        'id', l.id, 'name', l.name
                )) labels 
            FROM moment m
            LEFT JOIN users u ON u.id = m.user_id
            LEFT JOIN moment_label ml ON ml.moment_id = m.id
            LEFT JOIN label l ON ml.label_id = l.id

            WHERE m.id = 30
            GROUP BY m.id;
        `

        const [values] = await connection.execute(statement, [id])
        return values
    }

    async update(id, content) {
        const statement = `UPDATE moment SET content = ? WHERE id = ?;`

        const [values] = await connection.execute(statement, [content, id])
        return values
    }

    async remove(momentID) {
        const statement = 'DELETE FROM `moment` WHERE id = ?;'
        const result = await connection.execute(statement, [momentID])
        return result
    }

    async hasLabel(moment_id, label_id) {
        const statement = 'SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;'
        const [result] = await connection.execute(statement, [moment_id, label_id])
        return !!result.length
    }

    async addLabel(moment_id, label_id) {
        const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`
        const [result] = await connection.execute(statement, [moment_id, label_id])
        return result
    }
}

module.exports = new MomentService()