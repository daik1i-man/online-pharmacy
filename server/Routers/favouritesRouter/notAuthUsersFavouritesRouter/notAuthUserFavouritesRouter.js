const express = require('express')
const notAuthUsersFavourites = express.Router()
const {addProductToFavourites, deleteProductFromFavourites} = require('../../../Controllers/FavouritesControllers/notAuthUsersController/notAuthUsersController')

notAuthUsersFavourites.post('/add', addProductToFavourites)
notAuthUsersFavourites.get('/delete', deleteProductFromFavourites)

module.exports = notAuthUsersFavourites