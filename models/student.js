import mongoose from "mongoose"

const Student = mongoose.Schema({
  name:String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
})


const StudentSchema = mongoose.model("student", Student)

export default StudentSchema