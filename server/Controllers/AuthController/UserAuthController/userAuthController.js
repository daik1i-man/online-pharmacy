const { generateToken } = require('../../../functions/generateToken')
const insertNewDatas = require('../../../functions/insertNewDatas')
const getUser = require('../../../functions/getCurrentUser')
const insertUser = require('../../../functions/insertUser')
const checkUser = require('../../../functions/checkUser')
const main = require('../../../Services/eskiz')
const db = require('../../../Database/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function getUserNumber(req, res) {
    const { phone_number } = req.body

    const user = await checkUser(phone_number)

    try {
        if (user) {
            return res.status(409).json({ message: 'User already exists' })
        }

        res.cookie('phone_number', phone_number, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })

        const otp = await main(phone_number)

        if (otp) {
            res.cookie('otp', otp, {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            })
        }

        res.status(200).send({ message: 'Phone number and OTP saved in cookies' })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
async function verifyOtp(req, res) {
    const { userOtp } = req.body
    const { otp } = req.cookies

    try {
        if (userOtp === otp) {
            res.status(200).send('OTP is valid')
        } else {
            res.status(401).json({ message: 'invalid otp' })
        }
    } catch (error) {
        res.status(500).send(`error: ${error.message}`)
    }
}

async function getUserPassword(req, res) {
    const { password } = req.body
    const { phone_number } = req.cookies
    const { ensureGuestKey } = req.cookies

    const user = await insertUser(phone_number, password)

    try {
        if (user) {
            await db.query('DELETE FROM not_auth_user_cart WHERE user_secret_key = $1', [ensureGuestKey])
            await db.query('DELETE FROM not_auth_user_favourites WHERE user_secret_key = $1', [ensureGuestKey])
            await db.query('UPDATE products SET favourites = $1', [false])
            await db.query('UPDATE products SET cart = $1', [false])
            const token = generateToken(user)
            res.clearCookie('otp', {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            })
            res.clearCookie('phone_number', {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            })
            res.cookie('user.auth.token', token, {
                maxAge: 2147483647,
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            })

            res.status(200).json({
                message: 'user created successsfully',
                user: user
            })
        }
    } catch (error) {
        res.status(500).send(`error: ${error.message}`)
    }
}

async function login(req, res) {
    const { phone_number, password } = req.body
    const { ensureGuestKey } = req.cookies

    try {
        const user = await checkUser(phone_number)

        if (!user) {
            return res.status(404).json({ message: 'User not found!' })
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            return res.status(302).json({ message: 'Invalid password' })
        }

        await db.query('DELETE FROM not_auth_user_cart WHERE user_secret_key = $1', [ensureGuestKey])
        await db.query('DELETE FROM not_auth_user_favourites WHERE user_secret_key = $1', [ensureGuestKey])
        await db.query('UPDATE products SET favourites = $1', [false])
        await db.query('UPDATE products SET cart = $1', [false])

        const token = generateToken(user)

        res.cookie('user.auth.token', token, {
            maxAge: 2147483647,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
        return res.status(200).json({
            message: 'User logged in successfully',
            user: user
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

async function getCurrentUser(req, res) {
    const token = req.cookies['user.auth.token'];

    if (!token) {
        return res.status(401).send('Unauthorized!');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const response = await getUser(decoded.id);

        if (!response) {
            return res.status(404).json({ message: 'User not found!' });
        }

        res.status(200).json({ user: response });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong!',
            error: error.message
        });
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('user.auth.token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
        res.status(200).json({ message: 'user logged out!' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateUser(req, res) {
    const { number, first_name, last_name, img_url } = req.body;
    const token = req.cookies['user.auth.token'];

    if (!token) {
        return res.status(401).send('Unauthorized!');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await getUser(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const response = await insertNewDatas(number, first_name, last_name, img_url, user.id);
        res.status(200).json({ user: response });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong!',
            error: error.message
        });
    }
}


module.exports = {
    getUserNumber,
    verifyOtp,
    getUserPassword,
    login,
    getCurrentUser,
    logout,
    updateUser
}