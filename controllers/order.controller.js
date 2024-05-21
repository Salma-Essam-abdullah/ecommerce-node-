const User = require("../db/models/user.model");
const Order = require("../db/models/order.model");
const Product = require("../db/models/product.model");
 

exports.addOrder = async (req, res) => {
    try {
        
        const userId = req.user._id;
        const products = req.body.products;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found'
            });
        }
        const orderProducts = [];
        for (const product of products) {
            const { productId, quantity } = product;
            const foundProduct = await Product.findById(productId);
            if(foundProduct){
            orderProducts.push({ productId: productId, quantity: quantity });
            }else{
                return res.status(404).json({
                    status: 'failed',
                    message: 'product not found'
                });
            }
        }
        const order = new Order({
            userId: userId,
            products: orderProducts
        });
        const addedOrder = await order.save();

        res.status(201).json({
            status: 'success',
            message: 'Order added successfully',
            order: addedOrder
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};



// add products to order by product id 
// add quantity by req.body