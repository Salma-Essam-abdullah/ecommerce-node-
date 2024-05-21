

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
        unique: false
    },
    products: [{
        productId: {
          type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product ID is required"],
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
}, { timestamps: true });

  
orderSchema.path('products').validate(function(value) {
  const seen = new Set();
  for (const product of value) {
      if (seen.has(product.productId.toString())) {
          return false; 
      }
      seen.add(product.productId.toString());
  }
  return true; 
}, 'Each productId must be unique within the products array');

  const Order = mongoose.model('Order', orderSchema);

module.exports = Order;