
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');





/**
 * @desc get All Teachear
 * @name Get / api/v1/user/
 * @access public
 */


const getAllTeachear = (req, res ) => {
    // get user data form user json db
    const teachers = JSON.parse(readFileSync(path.join(__dirname, '../db/teacher.json')));


    // send data
    res.status(200).json(teachers);

}



/**
 * @desc create a New Teacher 
 * @name POST / api/v1/teacher/
 * @access public
 */


 const createTeacher = (req, res ) => {

    // get teachers data form teachers json db
    const teachers = JSON.parse(readFileSync(path.join(__dirname, '../db/teacher.json')));


    //get body data
    const {name, skill, age, cell} = req.body

    // validation
    if (!name || !skill || !cell || !age ) {
        res.status(400).JSON({
            massage : "Name & Skill is required"
        })
    } else {
        teachers.push({
            id : Math.floor(Math.random() * 10000000000).toString(),
            name : name,
            skill  : skill,
            age  : age,
            cell  : cell
        });

        writeFileSync(path.join(__dirname, '../db/teacher.json'), JSON.stringify(teachers));
        res.status(201).json({
            massage : "User Created Successfully"
        })

    }


}


// exporrt Controller
module.exports={
    getAllTeachear,
    createTeacher
}

