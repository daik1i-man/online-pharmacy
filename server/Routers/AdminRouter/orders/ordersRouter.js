const express = require('express')
const ordersRouter = express.Router()
const { getAllOrders, addOrder, updateOrder, deleteOrder } = require('../../../Controllers/AdminControllers/Orders/Orders')

ordersRouter.get('/get-all', getAllOrders)
ordersRouter.post('/add', addOrder)
ordersRouter.post('/update', updateOrder)
ordersRouter.post('/delete', deleteOrder)


module.exports = ordersRouter