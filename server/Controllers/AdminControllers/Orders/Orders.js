const db = require('../../../Database/config')
const { v4: uuidv4 } = require('uuid')

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
    const { userId } = req.cookies
    try {
        const response = await db.query('SELECT * FROM orders WHERE user_id = $1', [userId])
        res.status(200).json({ orders: response.rows })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message)
    }
}

async function addOrder(req, res) {
    const { phoneNumber, total_price, ordered_time, status, firstName, lastName, paymentType, cardNumber } = req.body
    const { userId } = req.cookies
    const id = uuidv4()

    try {
        const newOrder = await db.query(
            'INSERT INTO orders (phonenumber, total_price, ordered_time, id, status, user_id, first_name, last_name, payment_type, card_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [phoneNumber, total_price, ordered_time, id, status, userId, firstName, lastName, paymentType, cardNumber]
        )

        await db.query('DELETE FROM basket WHERE user_id = $1', [userId])
        
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
    const { id } = req.body
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