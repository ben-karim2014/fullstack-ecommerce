const express = require('express');
const router = express.Router();


const Category = require('../models/Category');
const Product = require('../models/Product');
const checkRole = require('../middlewares/RoleChecker');
const checkAuth = require('../middlewares/AuthChecker')

router.post('/add', checkAuth, checkRole(1), (req, res)=>{
  const sku = req.body.sku;
  const name = req.body.name;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const category= req.body.category;
  const isTaxed = req.body.isTaxed;
  const isInStock = req.body.isInStock;
  if (!sku) {
    return res.status(400).json({ error: 'sku is required.' });
  }

  if (!description) {
    return res
      .status(400)
      .json({ error: 'description is required.' });
  }

  if (!name) {
    return res
      .status(400)
      .json({ error: 'name is reqruired' });
  }

  if (!quantity) {
    return res.status(400).json({ error: 'Quantity is required.' });
  }

  if (!price) {
    return res.status(400).json({ error: 'Price of the product is required.' });
  }

  if (!category) {
    return res.status(400).json({ error: 'Category is required.' });
  }

  if (isTaxed == undefined) {
    return res.status(400).json({ error: 'verify is product is taxable is required' });
  }
  if (isInStock == undefined) {
    return res.status(400).json({ error: 'iInstock is required' });
  }
  var existingCategory = undefined;

  Product.findOne({ sku }, (err, existingProduct) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    if(existingProduct){
        return res.status(400).json({ error: 'This sku is already used by another product.' });
    }

})

Category.findOne({title : category}, (err, existingCategory)=>{
    if(err){
      return res.status(400).json({
          error: 'Unable to process your request. Please try again.'
        });
    }
    if(!existingCategory){
      return res.status(400).json({
          error: 'category should be an existing category.'
        });
    }

    const catId = existingCategory._id;
    const product = new Product({
        sku,
        name,
        description,
        price,
        quantity,
        category:catId,
        isTaxed,
        isInStock
    })
    
    product.save((err, data) => {
        if (err) {
          return res.status(400).json({
            message: 'Your request could not be processed. Please try again.',
            error: err
          });
        }
    
        res.status(200).json({
          success: true,
          message: `Product has been added successfully!`,
          product: data
        });
      });

})


})
module.exports=router