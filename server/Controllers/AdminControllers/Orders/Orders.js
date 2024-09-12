const db = require('../../../Database/config')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

async function getAllOrders(req, res) {
    try {
        const orders = await db.query('SELECT * FROM orders')
        if (orders.rows.length > 0) {
            res.status(200).json({
                message: 'Orders retrieved successfully',
                AllOrders: orders.rows
            })
        } else {
            res.status(200).json({
                message: 'The orders list is empty'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        })
    }
}

async function getUserOrders(req, res) {
    const token = req.cookies['user.auth.token']

    if (!token) {
        res.status(401).send('Unauthorized!')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    try {
        const response = await db.query('SELECT * FROM orders WHERE user_id = $1', [decoded.id])
        res.status(200).json({ orders: response.rows })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message)
    }
}

async function addOrder(req, res) {
    const { phoneNumber, total_price, ordered_time, status, firstName, lastName, paymentType, cardNumber } = req.body
    const token = req.cookies['user.auth.token']
    const id = uuidv4()

    if (!token) {
        res.status(401).send('Unauthorized!')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    try {
        const newOrder = await db.query(
            'INSERT INTO orders (phonenumber, total_price, ordered_time, id, status, user_id, first_name, last_name, payment_type, card_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [phoneNumber, total_price, ordered_time, id, status, decoded.id, firstName, lastName, paymentType, cardNumber]
        )

        await db.query('DELETE FROM basket WHERE user_id = $1', [decoded.id])

        await db.query('UPDATE products SET cart = $1', [false])

        res.status(200).json({
            message: 'Order added successfully',
            newOrder: newOrder.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        })
    }
}

async function deleteOrder(req, res) {
    const { id } = req.query
    try {
        await db.query('DELETE FROM orders WHERE id = $1', [id])
        res.status(200).json({
            message: "Order deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

module.exports = {
    getAllOrders,
    addOrder,
    deleteOrder,
    getUserOrders
}