const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');


const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

mongoose.plugin(slug, options);

// Category Schema
const CategorySchema = mongoose.Schema({  
  name: {
    type: String,
    trim: true,
    required: true,
    unique:true
  },
  slug: { type: String, slug: 'name', unique: true },
  description: {
    type: String,
    trim: true,
    required: true
  },
  updatedDate: Date,
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Category', CategorySchema);
