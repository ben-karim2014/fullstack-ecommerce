const express = require('express')
const router = express.Router()
const app = express();
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('./validationForm')

const User = require('../models/User')

/** @User authorization && routing login and register 
 * @route POST /api/register and api/login 
 * @ access Public
 * @Tasks:
 *  *   @Create a user object 
 *      @check and validate data entry
 *      @cheke if the email exist in the database. If it exist throw an error
 *      @if not, get the avatar of the user
 *      @encrypt password
 *      @save user 
 *      @create user payload and assign token jwt
 *      
 */

 //Register route
router.post('/register',
 async (req,res)=>{
   
   // Validating the data based on the schema in the validationForm
   const errors = registerValidation(req.body);
   if(errors.error) {(res.status(400).send(errors.error.details[0].message))}

   //verify that the email is unique
   const userExist = await User.findOne({email: req.body.email});
   if(userExist){res.status(400).send('This email already exists in our records');}

   //Hash the password
   const salt = await bycript.genSalt(10);
   const hashedPassword = await bycript.hash(req.body.password,salt);


   //Creating the User object
            const newuser = new User({
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               email: req.body.email,
               password: hashedPassword,
               address: req.body.address
           });
          
           try{
              //save the User object in the database
              const savedUser = await newuser.save();
               res.send({user_created: savedUser._id})
           }
           catch(error){ 
             res.status(400).send(error);
           }

         
})

//Login route
router.post('/login', async (req, res) => {
   
   // Validating the data based on the schema in the validationForm
   const errors = loginValidation(req.body);
   if(errors.error) {(res.status(400).send(errors.error.details[0].message))}

   //Check if the email exist in the database
   const loggedUser = await User.findOne({email: req.body.email});
   if(!loggedUser){res.status(400).send('Email or password is incorrect');}

   //If the email exist then Check if its password matches the one provided in the form
   const passValidate = await bycript.compare(req.body.password, loggedUser.password);
   if(!passValidate){res.status(400).send('Email or password is incorrect');}

   //creating payload
   const payload ={
      _id: loggedUser._id
   }
   //create token and assign it to the logged in user
   const token = jwt.sign(payload,process.env.TOKEN_KEY)
   res.header('Authautication-Key', token).send(token)

   //res.send('Logged in!')


});
 module.exports=router