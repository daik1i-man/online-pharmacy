const jwt = require('jsonwebtoken')

function generateToken(user) {
    const secretKey = process.env.JWT_SECRET_KEY
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '30d' })
    return token
}

module.exports = { generateToken }