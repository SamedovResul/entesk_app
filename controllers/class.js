import Class from '../models/class.js'
import Student from '../models/student.js'
import Teacher from '../models/Teacher.js'
import timeTable from '../models/timeTable.js'
import mongoose from 'mongoose'



// create
export const CreateClass = async (req,res) =>{

  const newClass = req.body
  
   

  try {
    const classes = new Class(newClass)
    
    await classes.save()
    console.log(classes)
    // if(classes){
    //   Table = new timeTable({
    //     class_Name:classes.name,
    //     class_Id:classes._id
    //   })
    // }
    res.status(201).json(classes)

  } catch (error) {
    res.status(409).json({message: error.message})
  }
}


// update
export const UpdateClass = async (req,res) =>{


  try {
    
  } catch (error) {
    
  }
}


// delete
export const DeleteClass = async (req,res) =>{


  try {
    
  } catch (error) {
    
  }
}