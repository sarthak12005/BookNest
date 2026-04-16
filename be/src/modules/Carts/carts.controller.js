const Cart = require('../models/Cart');


exports.getCart = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(400).json({message: "UserId not found"});
        }

        const cart = await Cart.findOne({userId});

        if (!cart) {
            return res.status(404).json({message: "Cart Not Found"});
        }

        res.status(200).json({message: "Cart fetched successfully", cart});
    } catch (error) {
        console.log("Error in get cart controller", error)
        res.status(500).json({message: "Internal Server error", error});
        
    }
}

exports.addToCart = async (req, res) => {
  try {
    const { userId } = req.user; // You’re extracting userId from the JWT middleware
    const { productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: "UserId, productId, and quantity are required" });
    }

    // Find user’s cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists, create a new one
      const newCart = new Cart({
        userId,
        products: [
          {
            productId,
            quantity,
          },
        ],
      });

      await newCart.save();
      return res.status(201).json({ message: "Cart created and product added", cart: newCart });
    }

    // If cart exists, check if product already exists in the cart
    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex > -1) {
      // Product already exists, update its quantity
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    return res.status(200).json({ message: "Product added to cart", cart });

  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


exports.removeItem = async (req, res) => {

}


exports.removeProduct = async (req, res) => {

}
