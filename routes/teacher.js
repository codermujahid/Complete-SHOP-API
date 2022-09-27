
const express = require('express'); 
const { getAllTeachear, createTeacher } = require('../controllers/teachersController');



// create a router
const router  = express.Router();



//Teacher routes
router.route('/').get(getAllTeachear).post(createTeacher);




// export router
module.exports = router;


