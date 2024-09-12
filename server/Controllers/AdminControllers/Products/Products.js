const db = require('../../../Database/config')
const { v4: uuidv4 } = require('uuid')

async function getAllProdcusts(req, res) {
    const { limit } = req.query
    try {
        const allProducts = await db.query('SELECT * FROM products LIMIT $1', [limit])
        if (allProducts.rows.length > 0) {
            res.status(200).json({
                message: "Products retrieved successfully",
                allProducts: allProducts.rows
            })
        } else {
            res.status(200).json({
                message: "Products list is empty"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

async function addProduct(req, res) {
    const { img_url, category, price, quantity, name, description } = req.body
    const id = uuidv4()

    try {
        const newProduct = await db.query(
            'INSERT INTO products (category, price, quantity, id, img_url, name, description, cart, favourites) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [category, price, quantity, id, img_url, name, description, false, false]
        )
        res.status(200).json({
            message: 'Product added successfully',
            newProduct: newProduct.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        })
    }
}

async function updateProduct(req, res) {
    const { img_url, category, price, quantity, id, name, description } = req.body

    try {
        const updatedProduct = await db.query('UPDATE products SET img_url = $1, category = $2, price = $3, quantity = $4, name = $5, description = $6  WHERE id = $7 RETURNING *', [img_url, category, price, quantity, name, description, id])
        res.status(200).json({
            message: "Product updated successfully",
            updatedProduct: updatedProduct.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            message: "Semothing went wrong",
            error: error.message
        })
    }
}

async function deleteProduct(req, res) {
    const { id } = req.query

    try {
        await db.query('DELETE FROM products WHERE id = $1', [id])
        res.status(200).json({
            message: "Products deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

async function getProductsByCategory(req, res) {
    const { category, limit } = req.query

    try {
        const products = await db.query('SELECT * FROM products WHERE category = $1 LIMIT $2', [category, limit])
        if (products.rows.length > 0) {
            res.status(200).json({
                message: `Fetched products where category = ${category}`,
                products: products.rows
            })
        } else {
            res.status(200).json({
                message: `Not found products where category = ${category}`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

async function getProductById(req, res) {
    const { id } = req.query

    try {
        const response = await db.query('SELECT * FROM products WHERE id = $1', [id])
        if (response.rows.length > 0) {
            res.status(200).json({
                product: response.rows[0]
            })
        } else {
            res.status(404).json({
                message: "Product not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

module.exports = {
    getAllProdcusts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getProductById
}