
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');



/**
 * @desc get all products data
 * @name Get / api/v1/product/
 * @access public
 */


 const getAllProduct = (req, res ) => {
    // get product data form product json db
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/products.json')));


    // send data
    res.status(200).json(products);

}

/**
 * @desc Creat a New product
 * @name POST / api/v1/product/
 * @access public
 */


const createProduct = (req, res ) => {

    // get product data form product json db
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/products.json')));


    //get body data
    const {name, slug, regular_price, sale_price, stock, short_desc, long_desc, category, tag } = req.body

    // validation
    if (!name ||  !slug || !regular_price || !sale_price || !stock || !short_desc ||  !long_desc || !category || !tag ) {
        res.status(400).JSON({
            massage : "Name & Skill is required"
        })
    } else {
        products.push({
            id : Math.floor(Math.random() * 10000000000).toString(),
            name : name, 
            slug  : slug,
            regular_price  : regular_price,
            sale_price  : sale_price,
            stock  : stock,
            short_desc  : short_desc,
            long_desc  : long_desc,
            category  : category,
            tag  : tag
            
        });
        writeFileSync(path.join(__dirname, '../db/products.json'), JSON.stringify(products));
        res.status(201).json({
            massage : "product Created Successfully"
        })

    }



}

/**
 * @desc Get single product
 * @name Get / api/v1/product/:id
 * @access public
 */


const singleProduct = (req, res ) => {

    // get product data form product json db
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/products.json')));


   const product = products.find( data => data.id == req.params.id );

   if (product) {
    res.status(200).json(product)
   } else {
    res.status(404).json({
        massage : "single product data not found"
    });
   }

}

/**
 * @desc delete product
 * @name DELETE / api/v1/product/:id
 * @access public
 */


const deleteProduct = (req, res ) => {

    // get product data form product json db
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/products.json')));


   if (products.some( data => data.id == req.params.id )) {
       const data = products.filter( data => data.id != req.params.id );
       writeFileSync(path.join(__dirname, '../db/products.json') , JSON.stringify(data));

       res.status(200).json({
        massage : "product delete success fully"
       })
   } else {
        res.status(401).json({

            massage : "product not found"

        })

   }

}

/**
 * @desc update product
 * @name UPDATE / api/v1/product/:id
 * @access public
 */


const updateProduct = (req, res ) => {

    // get product data form product json db
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/products.json')));

    // console.log();


   if (products.some( data => data.id == req.params.id )) {
       
    products[products.findIndex( data => data.id == req.params.id )] = {
        ... products[products.findIndex( data => data.id == req.params.id )],
        ...req.body
    };


       writeFileSync(path.join(__dirname, '../db/products.json') , JSON.stringify(products));

       res.status(200).json({
        massage : "product Update success fully"
       })
   } else {
        res.status(404).json({

            massage : "product Update not found"

        })

   }

}





module.exports = {
    getAllProduct,
    createProduct,
    singleProduct,
    deleteProduct,
    updateProduct
}
