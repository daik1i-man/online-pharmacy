const express = require('express')
const categoriesRouter = express.Router()
const { getAllCategories, addCategory, updateCategory, deleteCategory } = require('../../../Controllers/AdminControllers/Categories/Categories')

categoriesRouter.get('/get-all', getAllCategories)
categoriesRouter.post('/add', addCategory)
categoriesRouter.post('/update', updateCategory)
categoriesRouter.post('/delete', deleteCategory)

module.exports = categoriesRouter;