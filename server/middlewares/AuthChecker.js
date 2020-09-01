const jwt = require('jsonwebtoken')
const auth = (req,res, next)=>{
const token = req.header('token-auth');
if (!token){
    return res.status(401).send("Access Denied");

}
try{
    const verifyToken = jwt.verify(token, process.env.TOKEN_KEY)
    req.user =verifyToken
    next();
}
catch(err){
    res.status(400).send('No Access! Invalid Token ');
}


}
 module.exports = auth