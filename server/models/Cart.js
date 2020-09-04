const mongoose = require('mongoose');


const CartSchema = mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
      }],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    updated: Date,
    created: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = Mongoose.model('Cart', CartSchema);
  