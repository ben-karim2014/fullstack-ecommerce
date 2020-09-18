const jwt = require('jsonwebtoken')
const auth = (req,res, next)=>{
// const token = req.header('token-auth');
const cookieToken = req.cookies.token
const csrf = req.body._csrf

console.log(csrf)
console.log(req.cookies._csrf)


if (!cookieToken){
    return res.status(401).send("Access Denied");

}
if(csrf != req.cookies._csrf){
    return  res.status(400).send('No Access! Different Tokens ');

}
if(csrf === req.cookies._csrf){
    if(cookieToken){
        try{
            
            const verifyToken = jwt.verify(cookieToken, process.env.TOKEN_KEY)
            
            req.user =verifyToken
            next();
        }
        catch(err){
           return  res.status(400).send('No Access! Invalid Token ');
        }  
}

}





}
 module.exports = auth