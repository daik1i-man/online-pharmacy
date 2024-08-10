const db = require("../../Database/config");

async function getFavourites(req, res) {
    const { userId } = req.cookies
    const connectSID = req.cookies['connect.sid']

    try {
        if (userId === undefined) {
            const response = await db.query('SELECT * FROM not_auth_user_favourites WHERE user_secret_key = $1', [connectSID])

            res.status(200).json({
                title: 'not auth user favourite products',
                favourites: response.rows
            })
        } else {
            const response = await db.query('SELECT * FROM favourites WHERE user_id = $1', [userId])

            res.status(200).json({
                title: 'auth user favourite products',
                favourites: response.rows
            })
        }

    } catch (error) {
        console.error('Error fetching favourites:', error.message);
        res.status(500).json({
            error: error.message
        })
    }
}

async function addProductToFavourites(req, res) {
    const id = req.query.id
    const { userId } = req.cookies
    const connectSID = req.cookies['connect.sid']

    try {
        if (userId === undefined) {
            const favouritesResult = await db.query('SELECT * FROM products WHERE id = $1', [id])
            const product = favouritesResult.rows[0]

            if (!product) {
                return res.status(404).json({ message: 'product not found' })
            }

            await db.query(
                'INSERT INTO not_auth_user_favourites (product_id, user_secret_key, img_url, name, price, state) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [product.id, connectSID, product.img_url, product.name, product.price, product.favourites]
            )

            await db.query('UPDATE products SET favourites = $1 WHERE id = $2', [true, id]);

            res.status(200).json({
                message: 'not auth user added product to favourites'
            })
        } else {
            await db.query('UPDATE products SET favourites = $1 WHERE id = $2', [true, id]);
            const favouritesResult = await db.query('SELECT * FROM products WHERE id = $1', [id])
            const product = favouritesResult.rows[0]

            if (!product) {
                return res.status(404).json({ message: 'product not found' })
            }

            await db.query(
                'INSERT INTO favourites (id, img_url, name, price, user_id, state) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [product.id, product.img_url, product.name, product.price, userId, product.favourites])

            res.status(200).json({
                message: 'auth user added product to favourites'
            })
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
    const { userId } = req.cookies

    try {
        if (userId === undefined) {
            await db.query('DELETE FROM not_auth_user_favourites WHERE product_id = $1', [id])

            await db.query('UPDATE products SET favourites = $1 WHERE id = $2', [false, id]);

            res.status(200).json({
                message: 'not auth user deleted product from favourites',
            })

        } else {
            await db.query('DELETE FROM favourites WHERE id = $1', [id])
            await db.query('UPDATE products SET favourites = $1 WHERE id = $2', [false, id]);

            res.status(200).json({
                message: 'auth user deleted product from favourites',
            })
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
