import Teacher  from '../models/Teacher.js'
import StudentSchema from '../models/student.js';
import Class from '../models/class.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose'
import TimeTableSchema from '../models/timeTable.js';


export const getTeacher = async (req,res) =>{
  
  const {email} = req.body
  // console.log(token)
  try {

    const teacher = await Teacher.findOne({email})
    const timetable = await TimeTableSchema.find({teacher_Id: teacher._id})
    // console.log(timetable)
    const classes = await Class.find()
    const student = await StudentSchema.find()

    
    timetable.map((data) =>{
      const {class_Id, student_Id } = data

      classes.map((clss) =>{
        const {_id} = clss
        if(_id == class_Id){
          // console.log(clss)
        }
      })

      student.map((student) =>{
        const {_id} = student
        if(_id == student_Id){
          // console.log(student)
        }
      })

    })

    res.status(200).json({teacher})
  } catch (error) {
    res.status(404).json({messagex: error.message})
  }
}



export const getStudent = async (req,res) =>{
  const {id} = req.params;

  console.log(id)
  try {
    const timetable = await TimeTableSchema.find()
    console.log(timetable)
    // const student = await StudentSchema.findOne({_id: timetable.student_Id})
    // const Classes = await Class.find({_id: timetable.class_Id})

    timetable.map((student) =>{
      if(id == student.teacher_Id){
        console.log(student)
      }


    })

    // console.log(timetable)
    res.status(200).json({timetable})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}



const secret = "test"

export const signUpTeacher = async (req,res) =>{
  const {name,email,password} = req.body

  try {


    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = await Teacher.create({email, password: hashedPassword, name});
    const token = jwt.sign({email: admin.email, id: admin._id}, secret, {expiresIn: "1h"});

    res.status(200).json({token, admin})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

// export const signInTeacher = async (req, res) =>{
//   const {email, password} = req.body
//   // console.log(password)
//   try {

    
//     const teacher = await Teacher.findOne({email})
    

//     const isPasswordCorrect = await bcrypt.compare(password, teacher.password)

//     if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({email: teacher.email, id: teacher._id }, secret, {expiresIn: "1h"})
//     const timetable = await TimeTableSchema.find()
//     const classes = await Class.find()
//     const student = await StudentSchema.find()

//     const teacherData = {
//       timetable:[],
//       students:[]
//     }
//     timetable.map((data) =>{
//       const {class_Id, student_Id,teacher_Id } = data
//       // console.log(data)
//       if(teacher_Id == teacher._id){
//         teacherData.timetable.push(data)
//       }
//     })



//     teacherData.timetable.map((data) =>{
//       const { class_Id, student_Id} = data

//       classes.map((clss) =>{
//         const {_id} = clss
//         if(_id == class_Id){

//           student.map((student) =>{
//             const {_id} = student

//             if(_id == student_Id){
//               teacherData.students.push([student,clss])
//             }

//           })

//         }
//       })
//     })

//     res.status(200).json({teacher, token,teacherData})
//   } catch (error) {
//     res.status(404).json({message: error.message})
//     console.log({message: error.message})
//   }
// }