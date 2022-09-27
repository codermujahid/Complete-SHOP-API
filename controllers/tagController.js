const { readFileSync, writeFileSync } = require('fs');
const path = require('path');





/**
 * @desc get All tag
 * @name Get / api/v1/user/
 * @access public
 */


const getAllTag = (req, res ) => {
    // get user data form user json db
    const tags = JSON.parse(readFileSync(path.join(__dirname, '../db/tags.json')));


    // send data
    res.status(200).json(tags);

}



/**
 * @desc create a New tag 
 * @name POST / api/v1/tag/
 * @access public
 */


 const createTag = (req, res ) => {

    // get tags data form tags json db
    const tags = JSON.parse(readFileSync(path.join(__dirname, '../db/tags.json')));


    //get body data
    const {name, slug } = req.body

    // validation
    if (!name || !slug ) {
        res.status(400).JSON({
            massage : "Name & Skill is required"
        })
    } else {
        tags.push({
            id : Math.floor(Math.random() * 10000000000).toString(),
            name : name,
            slug  : slug
            
        });

        writeFileSync(path.join(__dirname, '../db/tags.json'), JSON.stringify(tags));
        res.status(201).json({
            massage : "tag Created Successfully"
        })

    }


}


/**
 * @desc Get single tag
 * @name Get / api/v1/tag/:id
 * @access public
 */


 const singleTag = (req, res ) => {

    // get tag data form tag json db
    const tags = JSON.parse(readFileSync(path.join(__dirname, '../db/tags.json')));


   const tag = tags.find( data => data.id == req.params.id );

   if (tag) {
    res.status(200).json(tag)
   } else {
    res.status(404).json({
        massage : "single tag data not found"
    });
   }

}

/**
 * @desc delete tag
 * @name DELETE / api/v1/tag/:id
 * @access public
 */


const deleteTag = (req, res ) => {

    // get tag data form tag json db
    const tags = JSON.parse(readFileSync(path.join(__dirname, '../db/tags.json')));


   if (tags.some( data => data.id == req.params.id )) {
       const data = tags.filter( data => data.id != req.params.id );
       writeFileSync(path.join(__dirname, '../db/tags.json') , JSON.stringify(data));

       res.status(200).json({
        massage : "tag delete success fully"
       })
   } else {
        res.status(401).json({

            massage : "tag not found"

        })

   }

}

/**
 * @desc update tag
 * @name UPDATE / api/v1/tag/:id
 * @access public
 */


const updateTag = (req, res ) => {

    // get tag data form tag json db
    const tags = JSON.parse(readFileSync(path.join(__dirname, '../db/tags.json')));

    // console.log();


   if (tags.some( data => data.id == req.params.id )) {
       
    tags[tags.findIndex( data => data.id == req.params.id )] = {
        ... tags[tags.findIndex( data => data.id == req.params.id )],
        ...req.body
    };


       writeFileSync(path.join(__dirname, '../db/tags.json') , JSON.stringify(tags));

       res.status(200).json({
        massage : "tag Update success fully"
       })
   } else {
        res.status(404).json({

            massage : "tag Update not found"

        })

   }

}


// exporrt Controller
module.exports= {
    getAllTag,
    createTag,
    updateTag,
    deleteTag,
    singleTag
}