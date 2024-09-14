const jwt = require('jsonwebtoken')

async function adminMiddleware(req, res, next) {
    const token = req.cookies['admin.auth.token']

    try {
        if (!token) {
            return res.status(404).send('Token not found!')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!decoded) {
            return res.status(401).send('UnAthtorized!')
        }

        res.status(200).send('Token verfied successfully!')
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

    next()
}

module.exports = adminMiddleware