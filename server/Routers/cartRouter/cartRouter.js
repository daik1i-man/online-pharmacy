const express = require('express')
const cartRouter = express.Router()
const { getCart, addProductToCart, deleteProductFromCart } = require('../../Controllers/CardControllers/cardControllers')

cartRouter.get('/get-cart', getCart)
cartRouter.post('/add', addProductToCart)
cartRouter.get('/delete', deleteProductFromCart)

module.exports = cartRouter