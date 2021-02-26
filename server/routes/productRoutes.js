const express = require('express');
const router = express.Router();

const Category = require('../models/Category');
const Product = require('../models/Product');

router.post('/add', (req, res) => {

    const user = req.body.user;
    const name = req.body.name;
    const image = req.body.image;
    const brand = req.body.brand;
    const category = req.body.category;
    const description= req.body.description;
    const reviews = req.body.reviews;
    const rating = req.body.rating;
    const numReviews = req.body.numReviews;
    const price = req.body.price;
    const countInstock = req.body.countInstock;

    const newProduct = new Product({
        user,
        name,
        image,
        brand,
        category,
        description,
        reviews,
        rating,
        numReviews,
        price,
        countInstock
    })

    newProduct.save((err,data) => {
        if(err){
            return res.status(400).json({
                success: false,
                message: 'Unable to process your request. Please try again.',
                error: err.message
            })
        }

        res.status(200).json({
            success: true,
            message: 'Product has been added successfully!',
            product: data
          });

    }
    ) 


});

router.get('/all', (req, res) => {
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

module.exports=router