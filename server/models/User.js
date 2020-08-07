const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
 firstName:{
     type: String,
     unique: true,
     required: true

 },
 lastName:{
    type: String,
    unique: true,
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
adress:{
    type:String,
    required: true
},
avatar:{
    type:String
}
})
module.export=mongoose.model('User', userSchema)