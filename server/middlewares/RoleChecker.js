const User = require('../models/User')


const CheckRole = (role)=> async(req, res, next)=> {

    if(!req.user){
        return res.status(401).send('Unauthorized Access!');
    }
    const UserC = await User.findById(req.user._id)
    // console.log(UserC.role);
    // console.log(role);
   
if(!(UserC.role === role))
{
    return res.status(403).send('You are not allowed to proceed with this request.');

}
return next();

}
module.exports= CheckRole