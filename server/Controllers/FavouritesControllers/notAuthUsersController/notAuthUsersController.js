const db = require("../../../Database/config");

async function getFavourites(req, res) {
  try {

    if (!req.session.favourites) {
      req.session.favourites = []
    }

    const favourites = req.session.favourites

    const productsId = req.session.favourites.map(item => item.id)

    if (productsId.length > 0) {
      const products = await db.query('SELECT * FROM products WHERE id = ANY($1::uuid[])', [productsId])
      const favouritesWithDetails = favourites.map(item => {
        const product = products.rows.find(p => p.id === item.id)

        return {
          ...item,
          product: product || null
        }
      })
      res.status(200).json(favouritesWithDetails)
    } else {
      res.status(200).json(favourites)
    }

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

async function addProductToFavourites(req, res) {
  const { id } = req.body;

  try {
    if (!req.session.favourites) {
      req.session.favourites = [];
    }

    const isFavourite = req.session.favourites.some(item => item.id === id);
    if (!isFavourite) {
      req.session.favourites.push({ id });
    }

    await db.query('UPDATE products SET favourites = $1 WHERE id = $2', [true, id]);

    res.status(200).json({
      message: "Product added to favourites"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function deleteProductFromFavourites(req, res) {
  const id = req.query.id;

  try {
    if (req.session.favourites) {
      req.session.favourites = req.session.favourites.filter(item => item.id !== id);
    }

    await db.query('UPDATE products SET favourites = $1 WHERE id = $2', [false, id]);

    res.status(200).json({
      message: `Product where id = ${id} deleted successfully`,
    });
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
