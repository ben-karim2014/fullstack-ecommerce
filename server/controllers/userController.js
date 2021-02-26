const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../routes/validationForm')
const checkAuth = require('../middlewares/AuthChecker')
const User = require('../models/User')




const userRegister = async(req, res) => {

    // Validating the data based on the schema in the validationForm
    const errors = registerValidation(req.body);
    if (errors.error) { return (res.status(400).send(errors.error.details[0].message)) }

    //verify that the email is unique
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) { return res.status(400).send('Invalid Email'); }

    //Hash the password
    const salt = await bycript.genSalt(10);
    const hashedPassword = await bycript.hash(req.body.password, salt);

    //Creating the User object
    const newuser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
            //address: req.body.address
    });

    //save the User object in the database
    const savedUser = await newuser.save();

    const payload = {
        id: savedUser._id,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName
            //address: savedUser.address
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
    try {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
        res.set('Access-Control-Allow-Headers', 'Content-Type')
        res.set('Access-Control-Allow-Credentials', 'true')
        res.status(200)
            // .cookie('token',token, options)
            .send(payload)
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }







    //create token and assign it to the logged in user
    //res.header('Authautication-Key', token).send(token)
    //set up options for the cookie 
}





module.exports = userRegister