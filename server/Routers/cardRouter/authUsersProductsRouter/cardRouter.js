const express = require("express");
const authUsersCardRouter = express.Router();
const { addProductToCart, deleteProductFromCart } = require("../../../Controllers/CardControllers/authUsersController/authUsersController");

authUsersCardRouter.post('/add', addProductToCart)
authUsersCardRouter.get('/delete', deleteProductFromCart)

module.exports = authUsersCardRouter;
