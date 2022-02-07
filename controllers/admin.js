import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import StudentSchema from '../models/student.js';
import Class from '../models/class.js';
import adminData from  '../models/adminData.js'
import Teacher  from '../models/Teacher.js'
import TimeTableSchema from '../models/timeTable.js';


const secret = "test"
export const getAdmin = async (req,res, ) =>{
  
 
  try{
    const admin = await adminData.find()
    res.status(200).json(admin)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

export const signin = async (req,res) =>{
  const {email, password} = req.body

  try {
    const admin = await adminData.findOne({email})
    const teacher = await Teacher.findOne({email})
    let signIn
    if (admin){
      signIn = admin
      console.log(admin)
    } else if (teacher){
      console.log(teacher)
      signIn = teacher
    }
    


    const isPasswordCorrect = await bcrypt.compare(password, signIn.password)

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({email: signIn.email, id: signIn._id}, secret, {expiresIn: "1h"})

    
    let Data
  if(teacher){
    console.log(teacher)
    const timetable = await TimeTableSchema.find()
    const classes = await Class.find()
    const student = await StudentSchema.find()

    Data = {
      timetable:[],
      students:[],
    }
    
    timetable.map((data) =>{
      const {class_Id, student_Id,teacher_Id } = data
      // console.log(data)
      if(teacher_Id == teacher._id){
        Data.timetable.push(data)
      }
    })

    Data.timetable.map((data) =>{
      const { class_Id, student_Id} = data

      classes.map((clss) =>{
        const {_id} = clss
        if(_id == class_Id){

          student.map((student) =>{
            const {_id} = student

            if(_id == student_Id){
              Data.students.push([student,clss])
            }

          })

        }
      })
    })
  }else{
    Data = {
      timetable:'',
      students:'',
      classes:'',
      teacher:''
    }

    const timetable = await TimeTableSchema.find()
    const classes = await Class.find()
    const student = await StudentSchema.find()
    const teacher = await Teacher.find()
    Data.timetable =timetable
    Data.classes =classes
    Data.students = student
    Data.teacher = teacher
  }

    res.status(200).json({admin, token, Data})
  } catch (error) {
    
  }
}

export const setAdmin = async (req,res) =>{
  const {name,email,password} = req.body
  console.log(req.body)
  
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = await adminData.create({email, password: hashedPassword, name});
    const token = jwt.sign({email: admin.email, id: admin._id}, secret, {expiresIn: "1h"});


    res.status(200).json({token, admin})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}