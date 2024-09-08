const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.cookies['user.auth.token'];

    if (!token) return res.status(401).send('Unauthorized!');

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Forbidden!');
        req.user = user; // добавление декодированного пользователя в запрос
        next();
    });
}

module.exports = { authenticateToken }
