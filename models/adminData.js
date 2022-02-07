import  mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
})

const adminData = mongoose.model('adminData', adminSchema)

export default adminData