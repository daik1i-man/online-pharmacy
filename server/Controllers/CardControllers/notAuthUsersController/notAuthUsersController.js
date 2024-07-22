const db = require("../../../Database/config");

async function getCart(req, res) {
  try {
    const cart = req.session.cart || []

    const productsId = cart.map(item => item.productId)

    if (productsId.length > 0) {
      const products = await db.query('SELECT * FROM products WHERE id = ANY($1::uuid[])', [productsId]);
      const cartwithDetails = cart.map(item => {
        const product = products.rows.find(p => p.id === item.productId)

        return {
          ...item,
          product: product || null
        }
      })
      res.status(200).json(cartwithDetails)
    } else {
      res.status(200).json(cart)
    }

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    })
  }
}

async function addProductToCart(req, res) {
  const { productId, quantity } = req.body;

  try {
    if (!req.session.cart) {
      req.session.cart = [];
    }

    const existingProduct = req.session.cart.find(item => item.productId === productId)

    if (existingProduct) {
      existingProduct.quantity += quantity
    } else {
      req.session.cart.push({ productId, quantity })
    }

    await db.query('UPDATE products SET cart = $1 WHERE id = $2', [true, productId])

    res.status(200).json({
      message: "Product added to cart"
    })
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
    req.session.cart = req.session.cart.filter(item => item.productId !== productId)

    await db.query('UPDATE products SET cart = $1 WHERE id = $2', [false, productId])

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
  getCart
};
