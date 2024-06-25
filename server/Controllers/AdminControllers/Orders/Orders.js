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

async function addOrder(req, res) {
    const { phoneNumber, total_price, ordered_time } = req.body
    const id = uuidv4()

    try {
        const newOrder = await db.query('INSERT INTO orders (phonenumber, total_price, ordered_time, id) VALUES ($1, $2, $3, $4) RETURNING *', [phoneNumber, total_price, ordered_time, id])
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

async function updateOrder(req, res) {
    const { id, phoneNumber, total_price, ordered_time } = req.body

    try {
        const updatedOrder = await db.query('UPDATE orders SET phonenumber = $1, total_price = $2, ordered_time = $3 WHERE id = $4 RETURNING *', [phoneNumber, total_price, ordered_time, id])
        res.status(200).json({
            message: "Order updated successfully",
            updatedOrder: updatedOrder.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            message: "Semothing went wrong",
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
    updateOrder,
    deleteOrder
}