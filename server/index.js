const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const router = require('./routes/auth.user')


require('dotenv').config({path: './config/cfg.env'})




const PORT =process.env.PORT;

app.get('/', (re,res)=>{
    res.send('This is the main page');
})


app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: true}))



//Route the non-existant pages


app.use('/api/users',router);

app.use((re,res)=>{
    res.status(404).json({Error:'Page not found'});
})
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});