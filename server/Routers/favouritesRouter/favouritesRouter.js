const express = require('express')
const favouritesRouter = express.Router()
const { getFavourites, addProductToFavourites, deleteProductFromFavourites } = require('../../Controllers/FavouritesControllers/favouritesControllers')

favouritesRouter.get('/get-favourites', getFavourites)
favouritesRouter.get('/add', addProductToFavourites)
favouritesRouter.get('/delete', deleteProductFromFavourites)

module.exports = favouritesRouter