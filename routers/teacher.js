import express from "express";
import {signUpTeacher, getTeacher, getStudent} from "../controllers/teacher.js"
import Auth from "../middleware/Auth.js"

const router = express.Router()


router.get("/get", Auth, getTeacher)
router.post("/register", signUpTeacher)
// router.get('/getStudent')
router.patch("/:id/getStudent",Auth, getStudent)


export default router