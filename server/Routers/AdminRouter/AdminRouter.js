const express = require('express')
const adminRouter = express.Router()
const categoriesRouter = require('./categories/categoriesRouter')
const employeesRouter = require('./employees/employeesRouter')
const ordersRouter = require('./orders/ordersRouter')
const productsRouter = require('./products/productsRouter')

adminRouter.use('/categories', categoriesRouter)
adminRouter.use('/employees', employeesRouter)
adminRouter.use('/orders', ordersRouter)
adminRouter.use('/products', productsRouter)

module.exports = adminRouter
