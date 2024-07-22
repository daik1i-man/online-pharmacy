const express = require("express");
const notAuthUsersCardRouter = express.Router();
const { addProductToCart, deleteProductFromCart, getCart } = require("../../../Controllers/CardControllers/notAuthUsersController/notAuthUsersController");

notAuthUsersCardRouter.post("/add", addProductToCart);
notAuthUsersCardRouter.get('/delete', deleteProductFromCart)
notAuthUsersCardRouter.get('/get-cart', getCart)

module.exports = notAuthUsersCardRouter;
