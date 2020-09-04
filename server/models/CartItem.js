const mongoose = require('mongoose');


const CartItemSchema = mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: Number,
    totalPrice: {
      type: Number
    },
    priceWithTax: {
      type: Number,
      default: 0
    }
  });
  
  module.exports = Mongoose.model('CartItem', CartItemSchema);