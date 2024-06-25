const vonage = require('../../Services/Vonage.config')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const db = require('../../Database/config')

const GenerateVerficationCode = () => {
    const verificationCode = Math.floor(1000 + Math.random() * 9000)
    return verificationCode
}

async function SenderSMS(req, res) {
    const { phoneNumber } = req.body
    const id = uuidv4()
    const verificationCode = GenerateVerficationCode()
    const to = phoneNumber
    const from = 'Online Pharmacy'
    const text = `Yout verification code is : ${verificationCode}`

    try {
        const result = await db.query('INSERT INTO users (id, number, verification_code) VALUES ($1, $2, $3) RETURNING*', [id, phoneNumber, verificationCode])
        vonage.sms.send({ to, from, text })
            .then(() => {
                res.cookie('req_id', id, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
                res.status(200).json({
                    message: "SMS sended successfully",
                    user: result.rows[0]
                })
            })
            .catch((err) => {
                res.status(401).json({
                    message: 'Something went wrong',
                    error: err.message
                })
            })
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong!',
            error: err.message
        })
    }
}

async function CheckSendedCode(req, res) {
    const { code } = req.body

    try {
        const result = await db.query('SELECT * FROM users WHERE verification_code = $1', [code])

        if (result.rows.length > 0) {
            res.status(200).json({
                message: 'Code checked successfully',
                user: result.rows[0]
            })
        } else {
            res.status(401).json({
                message: "invalid code"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Not checked",
            error: error.message
        })
    }
}

async function CreatePassword(req, res) {

}

module.exports = {
    SenderSMS,
    CheckSendedCode,
    CreatePassword
};