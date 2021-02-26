const express = require('express')
const router = express.Router()
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('./validationForm')
const checkAuth = require('../middlewares/AuthChecker')
var cors = require('cors')
const asyncHandler = require('express-async-handler')

router.use(cors());

const User = require('../models/User')


//Register route
router.post('/register',
    asyncHandler(async(req, res) => {

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

        try {
            res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
            res.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
            res.set('Access-Control-Allow-Headers', 'Content-Type')
            res.set('Access-Control-Allow-Credentials', 'true')
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
            res.status(200)
                // .cookie('token',token, options)
                .send(payload)
        } catch (err) {
            res.status(400).json({ msg: err.message });
        }
    }))

//Login route
router.post('/login', asyncHandler(async(req, res) => {

    // Validating the data based on the schema in the validationForm
    const errors = loginValidation(req.body);
    if (errors.error) { return (res.status(400).send(errors.error.details[0].message)) }

    //Check if the email exist in the database
    const loggedUser = await User.findOne({ email: req.body.email });
    if (!loggedUser) { return res.status(400).send('Email or password is incorrect E'); }

    //If the email exist then Check if its password matches the one provided in the form
    const passValidate = await bycript.compare(req.body.password, loggedUser.password);
    if (!passValidate) { return res.status(400).send('Email or password is incorrect P'); }

    req.session.userId = loggedUser._id;
    const payload = {
        id: loggedUser._id,
        email: loggedUser.email,
        firstName: loggedUser.firstName,
        lastName: loggedUser.lastName,
        //  address: loggedUser.address
    }

    try {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
        res.set('Access-Control-Allow-Headers', 'Content-Type')
        res.set('Access-Control-Allow-Credentials', 'true')
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

        res.status(200)
            //.cookie('token',token, options)
            .send(payload)
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
}));

/**
 * @route   GET api/v1/users/user
 * @desc    Get user data
 * @access  Private
 */


router.get('/user', asyncHandler(async(req, res) => {
    try {
        if (!req.session.userId) { return res.status(400).json({ msg: "User is not authenticated" }); }
        //throw Error('User is not authenticated');}
        const user = await User.findById(req.session.userId).select('-password');
        if (!user) { return res.status(400).json({ msg: "User does not exist" }); }
        //throw Error('User does not exist');}
        return res.json(user);
        // console.log(res.headersSent)
        // console.log(res.headers)
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}));


router.delete('/logout', asyncHandler(async({ session }, res) => {
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
}));
module.exports = router