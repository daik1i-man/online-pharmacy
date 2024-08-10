const db = require("../../Database/config");

async function getCart(req, res) {
    const { userId } = req.cookies
    const connectSID = req.cookies['connect.sid']

    try {
        if (userId === undefined) {
            const response = await db.query('SELECT * FROM not_auth_user_cart WHERE user_secret_key = $1', [connectSID])

            res.status(200).json({
                message: 'not auth user products',
                products: response.rows
            })
        } else {
            const response = await db.query('SELECT * FROM basket WHERE user_id = $1', [userId])

            res.status(200).json({
                title: 'auth user products',
                products: response.rows
            })
        }
    } catch (error) {
        console.error('Error fetching cart:', error.message);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

async function addProductToCart(req, res) {
    const { productId } = req.body;
    const { userId } = req.cookies
    const connectSID = req.cookies['connect.sid']

    try {
        if (userId === undefined) {

            const productResult = await db.query('SELECT * FROM products WHERE id = $1', [productId])
            const product = productResult.rows[0]

            const response = await db.query(
                'INSERT INTO not_auth_user_cart (id, user_secret_key, name, quantity, price, img_url, total_price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [product.id, connectSID, product.name, product.quantity, product.price, product.img_url, product.price]
            )

            await db.query('UPDATE products SET cart = $1 WHERE id = $2', [true, productId])

            res.status(200).json({
                title: 'not auth user added product to database',
                products: response.rows[0]
            })
        } else {

            const productResult = await db.query('SELECT * FROM products WHERE id = $1', [productId])
            const product = productResult.rows[0]

            if (!product) {
                return res.status(404).json({ message: 'product not found!' })
            }

            const response = await db.query(
                'INSERT INTO basket (id, user_id, img_url, name, quantity, price, total_price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [product.id, userId, product.img_url, product.name, product.quantity, product.price, product.price]
            )

            await db.query('UPDATE products SET cart = $1 WHERE id = $2', [true, productId])

            res.status(200).json({
                title: 'auth user added product to database',
                products: response.rows[0]
            })
        }

    } catch (error) {
        console.error('Error adding product to cart:', error.message);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

async function deleteProductFromCart(req, res) {
    const { productId } = req.query;
    const { userId } = req.cookies

    try {
        if (userId === undefined) {

            await db.query('DELETE FROM not_auth_user_cart WHERE id = $1', [productId])

            await db.query('UPDATE products SET cart = $1 WHERE id = $2', [false, productId])

            res.status(200).json({
                message: 'not auth user deleted product from basket',
            })
        } else {
            await db.query('UPDATE products SET cart = $1 WHERE id = $2', [false, productId])

            await db.query('DELETE FROM basket WHERE id = $1', [productId])

            res.status(200).json({
                message: 'auth user deleted product from basket',
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

module.exports = {
    addProductToCart,
    deleteProductFromCart,
    getCart
};
