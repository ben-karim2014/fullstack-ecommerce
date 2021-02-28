const mongoose = require('mongoose')
const express =require('express')


const connectDb =async ()=> {
   try {await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

  }).then(() => console.log('DB Connected!'))}
  catch(err){
    console.log(err.message)
  }
  
}
module.exports = connectDb