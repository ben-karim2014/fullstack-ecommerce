const express = require('express');
const router = express.Router();

const Category = require('../models/Category');
const checkRole = require('../middlewares/RoleChecker');



router.post('/add', checkRole(1), (req, res)=>{
    const categoryTitle = req.body.title;
    const description = req.body.description;

    if(!categoryTitle || ! description){
        return res.status(400).json({error: 'YOu must enter the category title and description'})
    }
    
    // create a category object
    const category= new Category({
        title: categoryTitle,
        description
    })
    category.save((err, data)=>{

        if (err) {
            return res.status(400).json({
              error: 'Category creation has failed. Please try again.'
            });
          }
          res.status(200).json({
            success: true,
            message: 'New category created!',
            category: data
          });
    })


})
module.exports=router