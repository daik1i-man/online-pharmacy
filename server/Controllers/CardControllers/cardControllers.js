const getUser = require("../../functions/getCurrentUser");
const db = require("../../Database/config");
const jwt = require('jsonwebtoken');


async function getCart(req, res) {
    const token = req.cookies['user.auth.token'];
    const { ensureGuestKey } = req.cookies

    try {
        if (!token) {
            const response = await db.query('SELECT * FROM not_auth_user_cart WHERE user_secret_key = $1', [ensureGuestKey])
            const cart = response.rows

            return res.status(200).json({
                message: 'Not auth user products',
                products: cart,
            });
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const response = await db.query('SELECT * FROM basket WHERE user_id = $1', [decoded.id])
            const cart = response.rows

            if (!response) {
                return res.status(404).json({ message: 'User not found!' });
            }

            return res.status(200).json({
                message: 'Auth user products',
                products: cart,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function addProductToCart(req, res) {
    const { productId, quantity } = req.body;
    const token = req.cookies['user.auth.token'];
    const { ensureGuestKey } = req.cookies

    try {
        const productResponse = await db.query('SELECT * FROM products WHERE id = $1', [productId]);
        const product = productResponse.rows[0];

        if (!token) {

            if (!product) {
                return res.status(404).json({ message: 'Product not found!' });
            }

            const response = await db.query(
                'INSERT INTO not_auth_user_cart (id, user_secret_key, name, quantity, price, img_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [product.id, ensureGuestKey, product.name, quantity, product.price, product.img_url]
            );

            if (response.rows.length === 0) {
                return res.status(409).json({ error: 'Error adding product to database!' });
            } else {
                return res.status(200).json({
                    title: 'Not auth user added product to database',
                });
            }
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const response = await getUser(decoded.id);

            if (!response) {
                return res.status(404).json({ message: 'User not found!' });
            }

            const cartResponse = await db.query(
                'INSERT INTO basket (id, user_id, img_url, name, quantity, price, total_price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [product.id, response.id, product.img_url, product.name, quantity, product.price, product.price]
            );

            if (cartResponse.rows.length === 0) {
                return res.status(409).json({ error: 'Error adding product to database!' });
            }

            return res.status(200).json({
                title: 'Auth user added product to database',
                products: response.rows[0],
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

async function deleteProductFromCart(req, res) {
    const { productId } = req.query;
    const token = req.cookies['user.auth.token'];

    try {
        if (!token) {
            const response = await db.query('DELETE FROM not_auth_user_cart WHERE id = $1', [productId]);

            if (response.rowCount === 0) {
                return res.status(409).json({ error: 'Error deleting product from database!' });
            }

            return res.status(200).json({
                message: 'Not auth user deleted product from basket',
            });
        } else {
            const response = await db.query('DELETE FROM basket WHERE id = $1', [productId]);

            if (response.rowCount === 0) {
                return res.status(409).json({ error: 'Error deleting product from basket!' });
            } else {
                await db.query('UPDATE products SET cart = $1 WHERE id = $2', [false, productId]);

                return res.status(200).json({
                    message: 'Auth user deleted product from basket',
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

module.exports = {
    addProductToCart,
    deleteProductFromCart,
    getCart,
};
