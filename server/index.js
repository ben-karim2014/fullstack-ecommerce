const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser =require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const connectMongo = require('./config/DbConnect')
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
// const Redis = require('ioredis')
require('dotenv').config({path: './config/cfg.env'})

var store = new MongoDBStore(
    {
        
        uri: process.env.MONGO_URI,
        collection: 'mySessions',
       
        expires: 1000 * 60 * 60 * 2, 
        clear_interval: 3600,
        connectionOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 10000
        }
    },
    // function(error) {
      // Should have gotten an error
      //console.log("Unable to connect to session store database")
 // }
    );

    store.on('error', function(error) {
        console.log(error);
      });

    const SessionSecureMode = process.env.NODE_ENV.trim() === 'production' ? true : false
      app.use(session({
        name: process.env.SESSION_NAME,
        resave: false,
        secret: process.env.TOKEN_KEY,
        cookie: {
          maxAge: 1000 * 60 * 60 * 2,
          sameSite: true,
          httpOnly: true,
          secure: SessionSecureMode
        },
        rolling:true,
        store: store,
        saveUninitialized: false
      }));


const user_route = require('./routes/auth.user')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/productRoutes')
var csrf = require('csurf');


connectMongo();




const PORT =process.env.PORT || 3000;




//middlewares bodyparser
var csrfProtection = csrf({ cookie: true })
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000' , credentials :  true}));
app.use(cookieParser())

 app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header('Access-Control-Allow-Credentials', 'true');
   next();
});

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