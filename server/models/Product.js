const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');


const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

mongoose.plugin(slug, options);

// Product Schema
const ProductSchema = mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true

  },
  name: {
    type: String,
    required:true,
    unique: true,
    trim: true
  },
  slug: { type: String, slug: 'name', unique: true },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
  },
  quantity: {
    type: Number
  },
  isInStock:{
    type: Boolean,
    default: false
  },
  price: {
    type: Number
  },
  isTaxed: {
    type: Boolean,
    default: false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
