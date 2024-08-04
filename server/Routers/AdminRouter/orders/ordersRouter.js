const express = require('express')
const ordersRouter = express.Router()
const { getAllOrders, addOrder, deleteOrder, getUserOrders } = require('../../../Controllers/AdminControllers/Orders/Orders')

ordersRouter.get('/get-all', getAllOrders)
ordersRouter.post('/add', addOrder)
ordersRouter.post('/delete', deleteOrder)
ordersRouter.get('/get-user-orders', getUserOrders)


module.exports = ordersRouter