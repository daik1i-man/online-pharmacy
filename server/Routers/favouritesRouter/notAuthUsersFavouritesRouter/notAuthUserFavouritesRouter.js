const express = require('express')
const notAuthUsersFavourites = express.Router()
const { addProductToFavourites, deleteProductFromFavourites, getFavourites } = require('../../../Controllers/FavouritesControllers/notAuthUsersController/notAuthUsersController')

notAuthUsersFavourites.post('/add', addProductToFavourites)
notAuthUsersFavourites.get('/delete', deleteProductFromFavourites)
notAuthUsersFavourites.get('/get-favourites', getFavourites)

module.exports = notAuthUsersFavourites