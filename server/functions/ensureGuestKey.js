const crypto = require('crypto')

function ensureGuestKey(req, res, next) {
    if (!req.cookies.ensureGuestKey && !req.cookies['user.auth.token']) {
        const secretKey = crypto.randomBytes(16).toString('hex')
        res.cookie('ensureGuestKey', secretKey, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/',
            maxAge: 365 * 24 * 60 * 60 * 1000
        })
    }

    if (req.cookies['user.auth.token']) {
        res.clearCookie('ensureGuestKey', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/'
        })
    }
    
    next()
}

module.exports = ensureGuestKey