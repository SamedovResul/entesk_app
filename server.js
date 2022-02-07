import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import blogRouter from './routers/blogRouter.js'
import adminRouter from './routers/adminRouter.js'
import student from './routers/student.js'
import teacher from './routers/teacher.js'
import classes  from './routers/Class.js';
import path from 'path';
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
dotenv.config()

app.use(cors())



app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/blogs', blogRouter)
app.use('/admin', adminRouter)
app.use('/teacher', teacher)
app.use('/class', classes)
app.use('/student', student)


app.get('/', (req,res) =>{
  res.send("hello world")
})
// const CONNECTION_URL = "mongodb+srv://Rasul:resul1418@cluster0.kihs8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";





const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen((PORT), () => console.log(`server running on Port:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`))


