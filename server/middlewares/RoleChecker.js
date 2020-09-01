const CheckRole = (role)=> (req, res, next)=> {

    if(!req.user){
        return res.status(401).send('Unauthorized Access!');
    }
if(!(req.user.role === role))
{
    return res.status(403).send('You are not allowed to proceed with this request.');

}
return next();

}
module.exports= CheckRole