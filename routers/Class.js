import  express  from "express";
import {CreateClass} from '../controllers/class.js'

const router = express.Router()

router.post('/', CreateClass)

export default router

