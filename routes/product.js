
const express = require('express');
const { getAllProduct, createProduct, deleteProduct, singleProduct, updateProduct } = require('../controllers/productController');





// API routs
 const router = express.Router();


 // users routes 
 router.route('/').get(getAllProduct).post(createProduct);
 router.route('/:id').get(singleProduct).delete(deleteProduct).put(updateProduct).patch();



  
 // exports router
 module.exports = router;