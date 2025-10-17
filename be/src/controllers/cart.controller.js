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
        const {userId} = req.user;
        const {productId, quantity} = req.body;
        
        if (!userId) {
            return res.status(400).json({message: "UserId Required"});
        }

        const cart = await Cart.findOne({userId});

        if (!cart) {
            const newCart = new Cart({
                userId: userId,
                product:{
                    productId: productId,
                    quantity: quantity
                }
            });

            if (!newCart) {
                
            }
        }

    } catch (error) {
        
    }
}

exports.removeItem = async (req, res) => {

}


exports.removeProduct = async (req, res) => {

}
