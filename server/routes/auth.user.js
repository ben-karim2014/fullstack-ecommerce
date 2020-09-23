const express = require('express')
const router = express.Router()
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('./validationForm')
const checkAuth = require('../middlewares/AuthChecker')




const User = require('../models/User')

/** @User authorization && routing login and register 
 * @route POST api/v1/users/register and api/v1/users/login 
 * @ access Public
 * @Tasks:
 *  *   @Create a user object 
 *      @check and validate data entry
 *      @cheke if the email exist in the database. If it exist throw an error
 *      @if not, get the avatar of the user
 *      @encrypt password
 *      @save user 
 *      @create user payload and assign token jwt
 *       .cookie('XSRF-TOKEN', req.csrfToken())

 *      
 */

 //Register route
router.post('/register', 
 async (req,res)=>{
   
   // Validating the data based on the schema in the validationForm
   const errors = registerValidation(req.body);
   if(errors.error) {return (res.status(400).send(errors.error.details[0].message))}

   //verify that the email is unique
   const userExist = await User.findOne({email: req.body.email});
   if(userExist){return res.status(400).send('Invalid Email');}

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

              //save the User object in the database
              const savedUser = await newuser.save();

               const payload ={
                  _id:savedUser._id
               }
               const token = jwt.sign(payload,process.env.TOKEN_KEY, {expiresIn :process.env.JWT_EXPIRE})
               const secure = process.env.NODE_ENV.trim() === 'production' ? true : false 
             const options = {
                exprires: new Date(Date.now()+process.env.COOKIE_EXPIR *24 *60*60*1000),
               httpOnly : true,
                secure:secure
             }
            try{
               res.status(200)
               .cookie('token',token, options)
               .json({
                  isAuthenticated: true, 
                  token
               })
            }
            catch(err){
               console.log(err)
            }
               
                  


      
           
          
 //create token and assign it to the logged in user
 //res.header('Authautication-Key', token).send(token)
 //set up options for the cookie 
})

//Login route
router.post('/login',  async (req, res) => {
   
   // Validating the data based on the schema in the validationForm
   const errors = loginValidation(req.body);
   if(errors.error) {return ( res.status(400).send(errors.error.details[0].message))}

   //Check if the email exist in the database
   const loggedUser = await User.findOne({email: req.body.email});
   if(!loggedUser){return res.status(400).send('Email or password is incorrect E');}

   //If the email exist then Check if its password matches the one provided in the form
   const passValidate = await bycript.compare(req.body.password, loggedUser.password);
   if(!passValidate){return res.status(400).send('Email or password is incorrect P');}

   //creating payload
   const payload ={
      _id: loggedUser._id
   }
   //create token and assign it to the logged in user
   const token = jwt.sign(payload,process.env.TOKEN_KEY, {expiresIn :process.env.JWT_EXPIRE})
   //res.header('Authautication-Key', token).send(token)
   //set up options for the cookie 
   const secure = process.env.NODE_ENV.trim() === 'production' ? true : false 

   const options ={
       expires: new Date(Date.now+ process.env.COOKIE_EXPIRE *24*60*60*1000),
       httpOnly: true,
       secure: secure
    }
   // if(process.env.NODE_ENV === 'production'){
   //    options.session =true;
   // }
   try{
      res
      .status(200)
      .cookie('token',token, options)
      .json({
         user_loggedIn: "success", 
         token
      })
   }
   catch(err){
      console.log(err)   }
});

/**
 * @route   GET api/v1/users/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/user', checkAuth, async (req, res) => {
   try {
     const user = await User.findById(req.user._id).select('-password');
     if (!user) throw Error('User does not exist');
     res.json(user);
   } catch (e) {
     res.status(400).json({ msg: e.message });
   }
 });
 module.exports=router