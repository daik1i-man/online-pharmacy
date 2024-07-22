const db = require("../../../Database/config");

async function addProductToCart(req, res) {
  const { id, userId, image_url, name, quantity, price } = req.body;

  console.log('this user authorized');

  try {
    const newProduct = await db.query(
      "INSERT INTO basket (id, user_id, image_url, name, quantity, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id, userId, image_url, name, quantity, price]
    );
    res.status(200).json({
      message: "Product added to card successfully",
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

  console.log('this user authorized');

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
