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
    return res.status(400).json({ error: 'Verifing that the product is taxable is required' });
  }
  if (isInStock == undefined) {
    return res.status(400).json({ error: 'Verifing that the product is in stock is required' });
  }
  var existedCategory = undefined;

  Product.findOne({ sku }, (err, existedProduct) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    if(existedProduct){
        return res.status(400).json({ error: 'This sku is already used by another product.' });
    }

})

Category.findOne({title : category}, (err, existedCategory)=>{
    if(err){
      return res.status(400).json({
          error: 'Unable to process your request. Please try again.'
        });
    }
    if(!existedCategory){
      return res.status(400).json({
          error: 'category should be an existing category.'
        });
    }

    const catId = existedCategory._id;
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
            message: 'Unable to process your request. Please try again.',
            error: err
          });
        }
    
        res.status(200).json({
          success: true,
          message: 'Product has been added successfully!',
          product: data
        });
      });

})
})
//fetch a product using the slug. 
//for now we will just all send all the properties of the product. This may change!

router.get('/:slugRef', (req, res) => {
    const slugID = req.params.slugRef;
    Product.findOne({ slug: slugID },(err, data) => {
        if (err) {
          return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }
        if (!data) {
          return res.status(404).json({
            message: 'No product found.'
          });
        }
        res.status(200).json({
          product: data
        });
      })
  });

// fetch all the products 
//for now we will just all send all the properties of the product. This may change!

router.get('/list/all', (req, res) => {
    Product.find({},(err, data) => {
        if (err) {
          return res.status(400).json({
            error: 'Unable to process your request. Please try again.'
          });
        }
        res.status(200).json({
          products: data
        });
      });
  });

  // fetch all the products by category
//for now we will just all send all the properties of the product. This may change!


module.exports=router