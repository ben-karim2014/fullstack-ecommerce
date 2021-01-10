const express = require('express')
const router = express.Router()
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('./validationForm')
const checkAuth = require('../middlewares/AuthChecker')
var cors = require('cors')

router.use(cors()); 

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
                  id:savedUser._id,
                  email: savedUser.email,
                  firstName: savedUser.firstName,
                  lastName: savedUser.lastName,
                  address: savedUser.address
               }
               req.session.userId = savedUser._id;
            //    const token = jwt.sign(payload,process.env.TOKEN_KEY, {expiresIn :process.env.JWT_EXPIRE})
            //    const secure = process.env.NODE_ENV.trim() === 'production' ? true : false 
            //    const options = {
            //     // exprires: 0,
            //     httpOnly : true,
            //      secure:secure,
            //      sameSite:true
            //   }
            try{
               res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
               res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
               res.set('Access-Control-Allow-Headers', 'Content-Type')
               res.set('Access-Control-Allow-Credentials', 'true')
               res.status(200)
               // .cookie('token',token, options)
               .send(payload)
            }
            catch(err){
               res.status(400).json({ msg: err.message });
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

   req.session.userId = loggedUser._id;
   const payload ={
      id:loggedUser._id,
      email: loggedUser.email,
      firstName: loggedUser.firstName,
      lastName: loggedUser.lastName,
      address: loggedUser.address
   }
   //creating payload
   // const payload ={
   //    _id: loggedUser._id
   // }
   //create token and assign it to the logged in user
  // const token = jwt.sign(payload,process.env.TOKEN_KEY, {expiresIn :process.env.JWT_EXPIRE})
   //res.header('Authautication-Key', token).send(token)
   //set up options for the cookie 
   //const secure = process.env.NODE_ENV.trim() === 'production' ? true : false 

   // const options ={
   //     expires: 0,
   //     httpOnly: true,
   //     secure: secure
   //  }
   // if(process.env.NODE_ENV === 'production'){
   //    options.session =true;
   // }
   try{
      res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
               res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
               res.set('Access-Control-Allow-Headers', 'Content-Type')
               res.set('Access-Control-Allow-Credentials', 'true')
      res
      .status(200)
      //.cookie('token',token, options)
      .send(payload)
   }
   catch(err){
      res.status(400).json({ msg: err.message });
   }
});

/**
 * @route   GET api/v1/users/user
 * @desc    Get user data
 * @access  Private
 */


router.get('/user',async (req, res) => {
   try {
      if(!req.session.userId){ return res.status(400).json({ msg: "User is not authenticated" });}
         //throw Error('User is not authenticated');}
     const user = await User.findById(req.session.userId).select('-password');
     if (!user) { return res.status(400).json({ msg: "User does not exist" });}
        //throw Error('User does not exist');}
     return res.json(user);
  // console.log(res.headersSent)
  // console.log(res.headers)
   } catch (e) {
     return res.status(400).json({ msg: e.message });
   }
 });

 
router.delete('/logout', async ({session}, res) => {
   try {
     const userID = session.userId;
     console.log(userID)
     if (userID) {
      session.destroy(err => {
        if (err) throw (err);
        res.clearCookie(process.env.SESSION_NAME);
        res.send(userID);
      });
    } else {
      throw new Error('Something went wrong');
    }
      
   } catch (e) {
     res.status(400).json({ msg: e.message });
   }
 });
 module.exports=router

 