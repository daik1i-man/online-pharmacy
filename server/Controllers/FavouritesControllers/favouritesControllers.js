const db = require("../../Database/config");
const jwt = require('jsonwebtoken');

async function getFavourites(req, res) {
    const token = req.cookies['user.auth.token'];
    const { ensureGuestKey } = req.cookies

    try {
        if (!token) {
            const response = await db.query('SELECT * FROM not_auth_user_favourites WHERE user_secret_key = $1', [ensureGuestKey])

            return res.status(200).json({
                title: 'not auth user favourite products',
                favourites: response.rows
            })
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const response = await db.query('SELECT * FROM favourites WHERE user_id = $1', [decoded.id])

            if (!response) {
                return res.status(404).json({ message: 'User not found!' });
            }

            return res.status(200).json({
                title: 'auth user favourite products',
                favourites: response.rows
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

async function addProductToFavourites(req, res) {
    const id = req.query.id
    const token = req.cookies['user.auth.token'];
    const { ensureGuestKey } = req.cookies

    try {
        if (!token) {
            const favouritesResult = await db.query('SELECT * FROM products WHERE id = $1', [id])
            const product = favouritesResult.rows[0]

            if (!product) {
                return res.status(404).json({ message: 'product not found' })
            }

            const response = await db.query(
                'INSERT INTO not_auth_user_favourites (id, user_secret_key, img_url, name, price, state) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [product.id, ensureGuestKey, product.img_url, product.name, product.price, true]
            )

            if (response.rows.length === 0) {
                return res.status(409).json({ error: 'Error adding favourites to database!' });
            } else {
                await db.query('UPDATE products SET favourites = $1 WHERE id = $2', [true, id]);

                return res.status(200).json({
                    message: 'not auth user added product to favourites'
                })
            }
        } else {
            const favouritesResult = await db.query('SELECT * FROM products WHERE id = $1', [id])
            const product = favouritesResult.rows[0]

            if (!product) {
                return res.status(404).json({ message: 'product not found' })
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            const response = await db.query(
                'INSERT INTO favourites (id, img_url, name, price, user_id, state) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [product.id, product.img_url, product.name, product.price, decoded.id, true]
            )

            if (response.rows.length === 0) {
                return res.status(409).json({ error: 'Error adding product to database!' });
            } else {
                await db.query('UPDATE products SET favourites = $1 WHERE id = $2', [true, id]);

                return res.status(200).json({
                    message: 'auth user added product to favourites'
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

async function deleteProductFromFavourites(req, res) {
    const id = req.query.id
    const token = req.cookies['user.auth.token'];

    try {
        if (!token) {
            const response = await db.query('DELETE FROM not_auth_user_favourites WHERE id = $1', [id])

            if (response.rowCount === 0) {
                return res.status(409).json({ error: 'Error deleting product from favourites!' });
            } else {
                await db.query('UPDATE products SET favourites = $1 WHERE id = $2', [false, id]);

                return res.status(200).json({
                    message: 'not auth user deleted product from favourites',
                })
            }
        } else {
            const response = await db.query('DELETE FROM favourites WHERE id = $1', [id])

            if (response.rowCount === 0) {
                return res.status(409).json({ error: 'Error deleting product from favourites!' });
            } else {
                await db.query('UPDATE products SET favourites = $1 WHERE id = $2', [false, id]);

                return res.status(200).json({
                    message: 'auth user deleted product from favourites',
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}



module.exports = {
    addProductToFavourites,
    deleteProductFromFavourites,
    getFavourites
};
