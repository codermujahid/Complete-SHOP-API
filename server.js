const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const customerRouter = require('./routes/customer');
const teacherRouter = require('./routes/teacher');



 // init environment variable
 const  PORT = process.env.port || 8080;

 // express init
 const app = express();




 // express milloewares
 app.use(express.json());
 app.use(express.urlencoded( { extended : false}));


// api routes
app.use('/api/v1/customer' , customerRouter);
app.use('/api/v1/teacher' , teacherRouter);



 // listen port 
 app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`.bgWhite.black);
 });

