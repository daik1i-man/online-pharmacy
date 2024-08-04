const db = require('../Database/config')

async function checkUser(phone_number) {
    const response = await db.query('SELECT * FROM users WHERE number = $1', [phone_number])
    return response.rows[0]
}

module.exports = checkUser