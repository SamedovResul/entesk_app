import express from "express";
import { getAdmin,setAdmin, signin } from "../controllers/admin.js";

// admin route

const router = express.Router()

router.get("/", getAdmin)
router.post("/signUp", setAdmin)
router.post("/signIn", signin)


export default router