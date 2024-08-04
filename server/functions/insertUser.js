const db = require('../Database/config')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

async function insertUser(phone_number, password) {
    const id = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 1)
    const insert = await db.query(
        'INSERT INTO users (id, number, first_name, last_name, img_url, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [id, phone_number, null, null, null, hashedPassword]
    )

    return insert.rows[0]
}

module.exports = insertUser