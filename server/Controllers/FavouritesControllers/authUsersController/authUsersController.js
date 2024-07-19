const db = require("../../../Database/config");

async function addProductToFavourites(req, res) {
  const { id, img_url, name, price, state, user_id } = req.body;

  try {
    const newProduct = await db.query(
      "INSERT INTO favourites (id, img_url, name, price, state, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, img_url, name, price, state, user_id]
    );
    res.state(200).json({
      message: "Product added to favourites",
      newProduct: newProduct.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function deleteProductFromFavourites(req, res) {
  const productId = req.query.productId;

  try {
    await db.query("DELETE FROM favourites where id = $1", [productId]);
    res.status(200).json({
      message: `Product where id = ${productId} deleted successfully`,
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
};
