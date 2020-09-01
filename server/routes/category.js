const express = require('express');
const router = express.Router();

const Category = require('../models/Category');
const checkRole = require('../middlewares/RoleChecker');
const checkAuth = require('../middlewares/AuthChecker')



router.post('/add', checkAuth, checkRole(1), (req, res)=>{
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

//getting all categories
router.get('/categories', (req, res)=>{
  Category.find({}, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Unable to process your request. Please try again later.'
      });
    }
    res.status(200).json({
      categories: data
    });
  });
})

//getting category by ID
router.get('/:id', (req,res)=>{
  const categoryId = req.params.id;
  Category.findById(categoryId, (err, data)=>{
    if (err) {
      return res.status(400).json({
        error: 'Unable to process your request. Please try again later.'
      });
    }
    res.status(200).json({
      category: data
    });
  });

})

//delete a category by ID 
router.delete('/delete/:id', checkAuth, checkRole(1), (req,res)=>{
  const categoryId = req.params.id;
  //console.log(categoryId);
  Category.deleteOne({ _id: categoryId }, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Unable to process your request. Please try again later.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted!'
     
    });
  });

})
module.exports=router