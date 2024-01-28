import express from "express"
import { deleteStudent, getStudents, updateStudent, uploadForm } from "../controller/formController.js"


const router = express.Router()

router.post('/upload',uploadForm)
router.get('/getStudents',getStudents)
router.put('/update/:_id',updateStudent)
router.delete('/delete/:_id',deleteStudent)

export default router

