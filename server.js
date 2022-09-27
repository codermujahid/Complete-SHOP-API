const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const customerRouter = require('./routes/customer');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const tagRouter = require('./routes/tag');



 // init environment variable
 const  PORT = process.env.port || 8080;

 // express init
 const app = express();




 // express milloewares
 app.use(express.json());
 app.use(express.urlencoded( { extended : false}));


// api routes
app.use('/api/v1/customer' , customerRouter);
app.use('/api/v1/category' , categoryRouter);
app.use('/api/v1/product' , productRouter);
app.use('/api/v1/tag' , tagRouter);



 // listen port 
 app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`.bgWhite.black);
 });

