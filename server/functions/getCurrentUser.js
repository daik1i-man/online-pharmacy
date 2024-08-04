const db = require('../Database/config')

async function getUser(id) {
    const response = await db.query('SELECT * FROM users WHERE id = $1', [id])
    return response.rows[0]
}

module.exports = getUser