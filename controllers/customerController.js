
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');





/**
 * @desc get all customers data
 * @name Get / api/v1/customer/
 * @access public
 */


const getAllCustomer = (req, res ) => {
    // get customer data form customer json db
    const customers = JSON.parse(readFileSync(path.join(__dirname, '../db/customers.json')));


    // send data
    res.status(200).json(customers);

}

/**
 * @desc Creat a New customer
 * @name POST / api/v1/customer/
 * @access public
 */


const createCustomer = (req, res ) => {

    // get customer data form customer json db
    const customers = JSON.parse(readFileSync(path.join(__dirname, '../db/customers.json')));


    //get body data
    const {name, email, cell, location, zip_code, shipping_address, billing_address } = req.body

    // validation
    if (!name ||  !email || !cell || !location || !zip_code || !shipping_address || !billing_address) {
        res.status(400).JSON({
            massage : "Name & Skill is required"
        })
    } else {
        customers.push({
            id : Math.floor(Math.random() * 10000000000).toString(),
            name : name, 
            email  : email,
            cell  : cell,
            zip_code  : zip_code,
            location    : location,
            shipping_address   : shipping_address,
            billing_address   : billing_address
        });
        writeFileSync(path.join(__dirname, '../db/customers.json'), JSON.stringify(customers));
        res.status(201).json({
            massage : "customer Created Successfully"
        })

    }



}

/**
 * @desc Get single customer
 * @name Get / api/v1/customer/:id
 * @access public
 */


const singleCustomer = (req, res ) => {

    // get customer data form customer json db
    const customers = JSON.parse(readFileSync(path.join(__dirname, '../db/customers.json')));


   const singleCustomer = customers.find( data => data.id == req.params.id );

   if (singleCustomer) {
    res.status(200).json(singleCustomer)
   } else {
    res.status(404).json({
        massage : "single customer data not found"
    });
   }

}

/**
 * @desc delete customer
 * @name DELETE / api/v1/customer/:id
 * @access public
 */


const deleteCustomer = (req, res ) => {

    // get customer data form customer json db
    const customers = JSON.parse(readFileSync(path.join(__dirname, '../db/customers.json')));


   if (customers.some( data => data.id == req.params.id )) {
       const data = customers.filter( data => data.id != req.params.id );
       writeFileSync(path.join(__dirname, '../db/customers.json') , JSON.stringify(data));

       res.status(200).json({
        massage : "customer delete success fully"
       })
   } else {
        res.status(401).json({

            massage : "customer not found"

        })

   }

}

/**
 * @desc update customer
 * @name UPDATE / api/v1/customer/:id
 * @access public
 */


const updateCustomer = (req, res ) => {

    // get customer data form customer json db
    const customers = JSON.parse(readFileSync(path.join(__dirname, '../db/customers.json')));

    // console.log();


   if (customers.some( data => data.id == req.params.id )) {
       
    customers[customers.findIndex( data => data.id == req.params.id )] = {
        ... customers[customers.findIndex( data => data.id == req.params.id )],
        ...req.body
    };


       writeFileSync(path.join(__dirname, '../db/customers.json') , JSON.stringify(customers));

       res.status(200).json({
        massage : "customer Update success fully"
       })
   } else {
        res.status(404).json({

            massage : "customer Update not found"

        })

   }

}

//

module.exports = {
    getAllCustomer,
    createCustomer,
    singleCustomer,
    deleteCustomer,
    updateCustomer
}


