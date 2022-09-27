
const express = require('express');
const { getAllCustomer, createCustomer, singleCustomer, deleteCustomer, updateCustomer } = require('../controllers/customerController');




 // API routs
 const router = express.Router();



 // users routes 
 router.route('/').get(getAllCustomer).post(createCustomer);
 router.route('/:id').get(singleCustomer).delete(deleteCustomer).put(updateCustomer).patch();



 
 // exports router
 module.exports = router;
 


