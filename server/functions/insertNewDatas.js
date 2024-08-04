const db = require('../Database/config')

async function insertNewDatas(number, first_name, last_name, img_url, userId) {
    try {
        const response = await db.query(
            'UPDATE users SET number = $1, first_name = $2, last_name = $3, img_url = $4 WHERE id = $5',
            [number, first_name, last_name, img_url, userId]
        )
        return response.rows[0]
    } catch (error) {
        console.log(`Error updating user`, error.message)
    }
}

module.exports = insertNewDatas