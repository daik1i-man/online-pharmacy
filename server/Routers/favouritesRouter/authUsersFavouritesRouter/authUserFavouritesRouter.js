const express = require('express')
const authUsersFavourites = express.Router()
const {addProductToFavourites, deleteProductFromFavourites} = require('../../../Controllers/FavouritesControllers/authUsersController/authUsersController')

authUsersFavourites.post('/add', addProductToFavourites)
authUsersFavourites.get('/delete', deleteProductFromFavourites)

module.exports = authUsersFavourites