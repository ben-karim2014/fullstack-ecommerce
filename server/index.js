const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


const PORT =3000;
app.get('/', (re,res)=>{
    res.send('This is the main page');
})
app.use(morgan('dev'));
app.use(cors);
app.use(express.urlencoded({extended: true}))
//Route the non-existant pages
app


app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});