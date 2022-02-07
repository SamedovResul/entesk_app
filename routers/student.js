import express from "express";
import { GetStudent,CreateStudent,} from "../controllers/student.js";

const router = express.Router()

router.get("/", GetStudent)
router.post("/", CreateStudent)

export default router

