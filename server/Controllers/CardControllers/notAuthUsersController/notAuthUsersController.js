const db = require("../../../Database/config");
const crypto = require("crypto");

async function addProductToCart(req, res) {
  const { productId, imageUrl, name, quantity, price } = req.body;
  const userId = crypto.randomBytes(64).toString("hex");

  try {
    if (!req.session.cart) {
      req.session.cart = [];
    }

    const newProduct = await db.query(
      "INSERT INTO basket (id, user_id, image_url, name, quantity, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [productId, userId, imageUrl, name, quantity, price]
    );

    req.session.cart.push(newProduct.rows[0]);

    res.status(200).json({
      message: "Product added to cart",
      newProduct: newProduct.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function deleteProductFromCart(req, res) {
  const productId = req.query.productId;

  try {
    await db.query("DELETE FROM basket WHERE id = $1", [productId]);
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
  addProductToCart,
  deleteProductFromCart,
};
