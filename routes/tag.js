
const express = require('express');
const { getAllTag, createTag, updateTag, deleteTag, singleTag } = require('../controllers/tagController');
 




// API routs
 const router = express.Router();


 // users routes 
 router.route('/').get(getAllTag).post(createTag);
 router.route('/:id').get(singleTag).delete(deleteTag).put(updateTag).patch();



  
 // exports router
 module.exports = router;