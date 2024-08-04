const db = require("../../Database/config");

async function getCart(req, res) {
    const { userId } = req.cookies

    try {
        if (userId === undefined) {
            const cart = req.session ? req.session.cart || [] : []

            const productsId = cart.map(item => item.productId)

            if (productsId.length > 0) {
                const products = await db.query('SELECT * FROM products WHERE id = ANY($1::uuid[])', [productsId]);

                return res.status(200).json({
                    title: 'not auth users products',
                    products: products.rows
                })
            } else {
                return res.status(200).json({
                    title: 'not auth users products',
                    products: cart
                })
            }
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
    const { productId, quantity, price } = req.body;
    const { userId } = req.cookies

    try {

        await db.query('UPDATE products SET cart = $1 WHERE id = $2', [true, productId])

        if (userId === undefined) {
            if (!req.session.cart) {
                req.session.cart = [];
            }

            const existingProduct = req.session.cart.find(item => item.productId === productId)

            if (existingProduct) {
                existingProduct.quantity += quantity
                existingProduct.price += price
            } else {
                req.session.cart.push({ productId, quantity, price })
            }

            return res.status(200).json({
                title: 'not auth user added product to session storage',
                products: req.session.cart,
            })
        } else {
            await db.query('UPDATE products SET cart = $1 WHERE id = $2', [true, productId])

            const productResult = await db.query('SELECT * FROM products WHERE id = $1', [productId])
            const product = productResult.rows[0]

            if (!product) {
                return res.status(404).json({ message: 'product not found!' })
            }

            const response = await db.query(
                'INSERT INTO basket (id, user_id, img_url, name, quantity, price, total_price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [product.id, userId, product.img_url, product.name, product.quantity, product.price, product.price]
            )

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
    const productId = req.query.productId;
    const { userId } = req.cookies

    try {
        if (userId === undefined) {
            await db.query('UPDATE products SET cart = $1 WHERE id = $2', [false, productId])
            if (!req.session.cart) {
                req.session.cart = []
            }

            req.session.cart = req.session.cart.filter(item => item.productId !== productId)

            return res.status(200).json({
                message: 'not auth user deleted product from session storage'
            })
        } else {
            await db.query('UPDATE products SET cart = $1 WHERE id = $2', [false, productId])

            await db.query('DELETE FROM basket WHERE id = $1', [productId])

            res.status(200).json({
                message: 'auth user deleted product from basket',
            });
        }



    } catch (error) {
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
