
const express = require('express'); 
const { getAllCategory, createCategory, deleteCategory, singleCategory, updateCategory  } = require('../controllers/categorysController');



// create a router
const router  = express.Router();



//Teacher routes
router.route('/').get(getAllCategory).post(createCategory);
router.route('/:id').get(updateCategory).delete(deleteCategory).put(singleCategory).patch();





// export router
module.exports = router;


