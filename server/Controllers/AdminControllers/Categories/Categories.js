const db = require('../../../Database/config')
const { v4: uuidv4 } = require('uuid')

async function getAllCategories(req, res) {
    try {
        const categories = await db.query('SELECT * FROM categories')
        if (categories.rows.length > 0) {
            res.status(200).json({
                message: 'Categories retrieved successfully',
                categories: categories.rows
            })
        } else {
            res.status(200).json({
                message: 'The categories list is empty'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        })
    }
}

async function addCategory(req, res) {
    const { name, img_url, created_date } = req.body
    const id = uuidv4()

    try {
        const categories = await db.query('INSERT INTO categories (name, img_url, created_date, id) VALUES ($1, $2, $3, $4) RETURNING *', [name, img_url, created_date, id])
        res.status(200).json({
            message: 'Category added successfully',
            category: categories.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        })
    }
}

async function updateCategory(req, res) {
    const { id, name, img_url, created_date } = req.body

    try {
        const updatedCategory = await db.query('UPDATE categories SET name = $1, img_url = $2, created_date = $3 WHERE id = $4 RETURNING *', [name, img_url, created_date, id])
        res.status(200).json({
            message: "Category updated successfully",
            updatedCategory: updatedCategory.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            message: "Semothing went wrong",
            error: error.message
        })
    }
}

async function deleteCategory(req, res) {
    const { id } = req.body

    try {
        await db.query('DELETE FROM categories WHERE id = $1', [id])
        res.status(200).json({
            message: "Category deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory
}