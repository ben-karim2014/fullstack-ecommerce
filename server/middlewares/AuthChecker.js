const User = require('../models/User')
const jwt = require('jsonwebtoken')

const auth = (req,res, next)=>{
// const token = req.header('token-auth');
const cookieToken = req.cookies.sid
const csrf = req.body._csrf

//console.log(csrf)
// console.log(`This the cookie token : ${cookieToken}`)
// console.log(req.cookies)


if (!cookieToken){
    return res.status(401).json({ msg: 'No token, authorization denied' });

}
if(csrf != req.cookies._csrf){
    return  res.status(400).json({ msg: 'Incorrect token' });

}
if(csrf === req.cookies._csrf){
    if(cookieToken){
        try{
            
            const verifyToken = jwt.verify(cookieToken, process.env.TOKEN_KEY)
            
            req.user =verifyToken
            next();
        }
        catch(err){
           return  res.status(400).json({ msg: 'Invalid token' });
        }  
}

}





}
 module.exports = auth