const jwt = require('jsonwebtoken')

async function userMiddleware(req, res, next) {
    const token = req.cookies['user.auth.token']

    try {
        if (!userToken) {
            return res.status(404).json({ message: 'Token not found!' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!decoded) {
            return res.status(401).send('Unauthorized!')
        }

        res.status(200).send('User authorized')

        next()
    } catch (error) {
        resizeBy.status(500).json({
            error: error.message
        })
    }
}

module.exports = userMiddleware