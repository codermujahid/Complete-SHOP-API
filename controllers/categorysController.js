
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');





/**
 * @desc get All category
 * @name Get / api/v1/user/
 * @access public
 */


const getAllCategory = (req, res ) => {
    // get user data form user json db
    const categorys = JSON.parse(readFileSync(path.join(__dirname, '../db/categorys.json')));


    // send data
    res.status(200).json(categorys);

}



/**
 * @desc create a New category 
 * @name POST / api/v1/category/
 * @access public
 */


 const createCategory = (req, res ) => {

    // get categorys data form categorys json db
    const categorys = JSON.parse(readFileSync(path.join(__dirname, '../db/categorys.json')));


    //get body data
    const {name, slug, photo } = req.body

    // validation
    if (!name || !slug || !photo ) {
        res.status(400).JSON({
            massage : "Name & Skill is required"
        })
    } else {
        categorys.push({
            id : Math.floor(Math.random() * 10000000000).toString(),
            name : name,
            slug  : slug,
            photo  : photo,
            
        });

        writeFileSync(path.join(__dirname, '../db/categorys.json'), JSON.stringify(categorys));
        res.status(201).json({
            massage : "Category Created Successfully"
        })

    }


}


/**
 * @desc Get single category
 * @name Get / api/v1/category/:id
 * @access public
 */


 const singleCategory = (req, res ) => {

    // get category data form category json db
    const categorys = JSON.parse(readFileSync(path.join(__dirname, '../db/categorys.json')));


   const category = categorys.find( data => data.id == req.params.id );

   if (category) {
    res.status(200).json(category)
   } else {
    res.status(404).json({
        massage : "single category data not found"
    });
   }

}

/**
 * @desc delete category
 * @name DELETE / api/v1/category/:id
 * @access public
 */


const deleteCategory = (req, res ) => {

    // get category data form category json db
    const categorys = JSON.parse(readFileSync(path.join(__dirname, '../db/categorys.json')));


   if (categorys.some( data => data.id == req.params.id )) {
       const data = categorys.filter( data => data.id != req.params.id );
       writeFileSync(path.join(__dirname, '../db/categorys.json') , JSON.stringify(data));

       res.status(200).json({
        massage : "category delete success fully"
       })
   } else {
        res.status(401).json({

            massage : "category not found"

        })

   }

}

/**
 * @desc update category
 * @name UPDATE / api/v1/category/:id
 * @access public
 */


const updateCategory = (req, res ) => {

    // get category data form category json db
    const categorys = JSON.parse(readFileSync(path.join(__dirname, '../db/categorys.json')));

    // console.log();


   if (categorys.some( data => data.id == req.params.id )) {
       
    categorys[categorys.findIndex( data => data.id == req.params.id )] = {
        ... categorys[categorys.findIndex( data => data.id == req.params.id )],
        ...req.body
    };


       writeFileSync(path.join(__dirname, '../db/categorys.json') , JSON.stringify(categorys));

       res.status(200).json({
        massage : "category Update success fully"
       })
   } else {
        res.status(404).json({

            massage : "category Update not found"

        })

   }

}


// exporrt Controller
module.exports= {
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    singleCategory
}

