import Class from '../models/class.js'
import Student from '../models/student.js'
import Teacher from '../models/Teacher.js'
import timeTable from '../models/timeTable.js'
import mongoose from 'mongoose'



// get
export const GetStudent = async (req,res) =>{

  const newStudent = req.body
 

  try {
     
    
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

// create
export const CreateStudent = async (req,res) =>{

  const {name, class_Id,  teacher_Id, } = req.body

  
  try {
    const student = new Student({
      name: name
    })
    const teacher = await Teacher.findOne({_id:teacher_Id})
    const classes = await Class.findOne({_id:class_Id})


    

     await student.save()
    console.log(teacher,classes)
    const timetable = new timeTable(
      {
      student_Name :student.name,
      student_Id:student._id,
      teacher_Name: teacher.name,
      teacher_Id: teacher._id,
      class_Name: classes.name,
      class_Id:classes._id
      }
    )
    await timetable.save()

     res.status(201).json({student, timetable})
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}


// update
export const UpdateStudent = async (req,res) =>{


  try {
    
  } catch (error) {
    
  }
}


// delete
export const DeleteStudent = async (req,res) =>{


  try {
    
  } catch (error) {
    
  }
}