const express = require("express");
const notAuthUsersCardRouter = express.Router();
const { addProductToCart, deleteProductFromCart } = require("../../../Controllers/CardControllers/notAuthUsersController/notAuthUsersController");

notAuthUsersCardRouter.post("/add", addProductToCart);
notAuthUsersCardRouter.get('/delete', deleteProductFromCart)

module.exports = notAuthUsersCardRouter;
