const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

Mongoose.plugin(slug, options);

// Product Schema
const ProductSchema = new Schema({
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
    type: Schema.Types.ObjectId,
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
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Product', ProductSchema);
