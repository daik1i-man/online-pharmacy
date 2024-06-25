const express = require('express')
const productsRouter = express.Router()
const { getAllProdcusts, addProduct, updateProduct, deleteProduct } = require('../../../Controllers/AdminControllers/Products/Products')

productsRouter.get('/get-all', getAllProdcusts)
productsRouter.post('/add', addProduct)
productsRouter.post('/update', updateProduct)
productsRouter.post('/delete', deleteProduct)

module.exports = productsRouter