const insertNewDatas = require('../../../functions/insertNewDatas')
const getUser = require('../../../functions/getCurrentUser')
const insertUser = require('../../../functions/insertUser')
const checkUser = require('../../../functions/checkUser')
const main = require('../../../Services/eskiz')
const bcrypt = require('bcrypt')

async function getUserNumber(req, res) {
    const { phone_number } = req.body
    const user = await checkUser(phone_number)

    try {
        if (user) {
            return res.status(409).json({ message: 'User already exists' })
        }

        res.cookie('phone_number', phone_number, { httpOnly: false })

        const otp = await main(phone_number)
        if (otp) {
            res.cookie('otp', otp, { httpOnly: true })
        }

        res.status(200).send({ message: 'Phone number and OTP saved in cookies' });
    } catch (error) {
        console.log(error.message);
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
        console.log(error.message);
        res.status(500).send(`error: ${error.message}`)
    }
}

async function getUserPassword(req, res) {
    const { password } = req.body
    const { phone_number } = req.cookies

    try {
        const insert = await insertUser(phone_number, password)
        res.clearCookie('otp')
        res.clearCookie('phone_number')
        res.cookie('userId', insert.id, { maxAge: 2147483647545487, httpOnly: true })
        res.status(200).json({ message: 'user created successsfully', user: insert })
    } catch (error) {
        res.status(500).send(`error: ${error.message}`)
    }
}

async function login(req, res) {
    const { phone_number, password } = req.body

    try {
        const user = await checkUser(phone_number)

        if (!user) {
            return res.status(404).json({ message: 'User not found!' })
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            return res.status(302).json({ message: 'Invalid password' })
        }

        res.cookie('userId', user.id, { maxAge: 2147483647545487, httpOnly: true })
        res.status(200).json({ message: 'User logged successfully' })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

async function getCurrentUser(req, res) {
    const { userId } = req.cookies

    try {
        const response = await getUser(userId)
        if (response) {
            return res.status(200).json({ user: response })
        } else {
            return res.status(404).json({ message: 'user not found' })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('userId')
        res.status(200).json({ message: 'user logged out!' })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
}

async function updateUser(req, res) {
    const { number, first_name, last_name, img_url } = req.body
    const { userId } = req.cookies

    try {
        const response = await insertNewDatas(number, first_name, last_name, img_url, userId)
        res.status(200).json({ user: response })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Something went wrong!'
        })
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