
const express = require('express'); 
const { getAllCategory, createCategory, deleteCategory, singleCategory, updateCategory  } = require('../controllers/categorysController');



// create a router
const router  = express.Router();



//Teacher routes
router.route('/').get(getAllCategory).post(createCategory);
router.route('/:id').get(singleCategory).delete(deleteCategory).put(updateCategory).patch();





// export router
module.exports = router;


