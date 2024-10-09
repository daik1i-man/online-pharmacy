const express = require('express')
const productsRouter = express.Router()
const { getAllProdcusts, addProduct, updateProduct, deleteProduct, getProductsByCategory, getProductById } = require('../../../Controllers/AdminControllers/Products/Products')

productsRouter.get('/get-all', getAllProdcusts)
productsRouter.post('/add', addProduct)
productsRouter.post('/update', updateProduct)
productsRouter.get('/delete', deleteProduct)
productsRouter.get('/get-products', getProductsByCategory)
productsRouter.get('/product', getProductById)

module.exports = productsRouter