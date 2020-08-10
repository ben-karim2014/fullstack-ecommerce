const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser =require('body-parser')
const app = express()
const connectMongo = require('./config/DbConnect')

const router = require('./routes/auth.user')

require('dotenv').config({path: './config/cfg.env'})



connectMongo();


const PORT =process.env.PORT;


//middlewares bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));
app.use(cors());



//Routes

app.get('/', (re,res)=>{
    res.send('This is the main page');
})

app.use('/api/users',router);

app.use((re,res)=>{
    res.status(404).json({Error:'Page not found'});
})
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});