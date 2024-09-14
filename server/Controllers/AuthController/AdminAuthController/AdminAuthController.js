const { generateToken } = require('../../../functions/generateToken')
const db = require('../../../Database/config')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function AdminRegister(req, res) {
    const { name, phoneNumber, password } = req.body
    const id = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 1)

    try {
        const result = await db.query('INSERT INTO admin (id, phonenumber, password, name) VALUES ($1, $2, $3, $4) RETURNING*', [id, phoneNumber, hashedPassword, name])
        res.status(200).json({
            message: 'Admin registered successfully',
            admin: result.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

async function AdminLogin(req, res) {
    const { phoneNumber, password } = req.body

    try {
        const admin = await db.query('SELECT * FROM admin WHERE phonenumber = $1', [phoneNumber])
        if (admin.rows.length > 0) {
            const adminRow = admin.rows[0]
            const comparePassword = await bcrypt.compare(password, adminRow.password)

            if (comparePassword) {
                const token = generateToken(adminRow)
                res.cookie('admin.auth.token', token, {
                    maxAge: 2147483647,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None'
                })
                res.status(200).json({
                    message: 'Admin logged successfully',
                    admin: adminRow
                })
            } else {
                res.status(409).json({
                    message: 'Invalid password'
                })
            }
        } else {
            res.status(404).json({
                message: 'Admin not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

async function getCurrentAdmin(req, res) {
    const token = req.cookies['admin.auth.token'];

    if (!token) {
        return res.status(401).send('Unauthorized!');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const response = await db.query('SELECT * FROM admin WHERE id = $1', [decoded.id])
        if (!response) {
            return res.status(404).json({ message: 'User not found!' });
        }

        return res.status(200).json({
            message: 'Admin fetched successfully!',
            admin: response.rows
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

async function logout(req, res) {
    res.clearCookie('admin.auth.token', {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax'
    })
    res.status(200).send('Admin logged successfully!')
}


module.exports = { AdminRegister, AdminLogin, getCurrentAdmin, logout }