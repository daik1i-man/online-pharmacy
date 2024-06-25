const bcrypt = require('bcrypt')
const db = require('../../../Database/config')
const { v4: uuidv4 } = require('uuid')
const cookie = require('cookie')
const session = require('express-session')

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
                res.setHeader('Set-Cookie', cookie.serialize('admin_id', adminRow.id, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    path: '/'
                }))
                res.status(200).json({
                    message: 'Admin logged successfully',
                    admin: adminRow
                })
            } else {
                res.status(302).json({
                    message: 'Invalid password'
                })
            }
        } else {
            res.status(401).json({
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
    const { id } = req.body

    try {
        const result = await db.query('SELECT * FROM admin WHERE id = $1', [id])
        if (result.rows.length > 0) {
            res.status(200).json({
                message: "Current admin fetched successfully",
                currentAdmin: result.rows[0]
            })
        } else {
            req.status(302).json({
                message: "Wrong id"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

async function logout(req, res) {
    res.clearCookie('admin_id')
    res.redirect('http://localhost:3000/login')
}


module.exports = { AdminRegister, AdminLogin, getCurrentAdmin, logout }