const express = require('express')
const categoriesRouter = express.Router()
const { getAllCategories, addCategory, updateCategory, deleteCategory, getCategoryById } = require('../../../Controllers/AdminControllers/Categories/Categories')

categoriesRouter.get('/get-all', getAllCategories)
categoriesRouter.post('/add', addCategory)
categoriesRouter.post('/update', updateCategory)
categoriesRouter.get('/delete', deleteCategory)
categoriesRouter.get('/category', getCategoryById)

module.exports = categoriesRouter;