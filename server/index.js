const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser =require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const connectMongo = require('./config/DbConnect')
// const session = require('express-session')
// const connectRedis= require('connect-redis')
// const Redis = require('ioredis')
require('dotenv').config({path: './config/cfg.env'})

// const RedisStore = new connectRedis(session)

// const redisOptions = {
//     port:process.env.REDIS_PORT,
//     host: process.env.REDIS_HOST
// };


// const client = new Redis(redisOptions)

// const HALF_HOUR = process.env.COOKIE_IDLE_TIMEOUT * 60*30
// const SessionSecureMode = process.env.NODE_ENV.trim() === 'production' ? true : false
//console.log(SessionSecureMode)

//setting up sessions
// app.use(session({
//     //store: new RedisStore({client}),
//     secret: process.env.SESSION_SECRET,
//     resave : false,
//     saveUninitialized: false,
//     name:process.env.SESSION_NAME,
//     rolling: true,
//     cookie:{
//         maxAge: HALF_HOUR,
//         httpOnly: true,
//         secure: SessionSecureMode,
//         sameSite: true
//     }


// }))

    

const user_route = require('./routes/auth.user')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')
var csrf = require('csurf');



connectMongo();


const PORT =process.env.PORT || 3000;


//middlewares bodyparser
var csrfProtection = csrf({ cookie: true })
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser())



//Routes

//up level route
app.get('/', csrfProtection,(req,res)=>{
    res.cookie('_csrf', req.csrfToken());
    res.send('This is the main page');
})

//user routes 
app.use('/api/v1/users',user_route);
//category routes
app.use('/api/v1/category',categoryRoute);
//product routes
app.use('/api/v1/product', productRoute);

//Manage unknown routes
app.use((re,res)=>{
    res.status(404).json({Error:'Page not found'});
})

//running the server
const server = app.listen(PORT, () => {
    console.log(`Server started in ${process.env.NODE_ENV} envirement on port: ${PORT}`);
});


//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise)=>{
    console.log(`unhandledRejection Error: ${err.message}`);
    //close the server 
    server.close(()=> process.exit(1))
})