import mongoose from 'mongoose'

const timeTable = mongoose.Schema({
  student_Name:String,
  student_Id:String,
  teacher_Name: String,
  teacher_Id: String,
  class_Name: String,
  class_Id:String
})

const TimeTableSchema = mongoose.model("table", timeTable)

export default TimeTableSchema