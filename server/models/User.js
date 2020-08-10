const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
 firstName:{
     type: String,
     required: true
 },
 lastName:{
    type: String,
    required: true
},
email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    rquired:true
},
role: {
    type: Number,
    default: 0
},
address:{
    type:String,
    required: true
},
avatar:{
    type:String
},
createdDate:{
    type:Date,
    default:Date.now
}
})
module.exports=mongoose.model('User', userSchema)