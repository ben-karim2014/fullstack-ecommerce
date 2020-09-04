const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    total: {
      type: Number,
      default: 0
    },
    totalTax: {
      type: Number,
      default: 0
    },
    updated: Date,
    created: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = Mongoose.model('Order', OrderSchema);