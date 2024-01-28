import express from "express"
import { getStudents, updateStudent, uploadForm } from "../controller/formController"


const router = express.Router()

router.post('/uploadForm',uploadForm)
router.get('/getStudents',getStudents)
router.put('/update/:id',updateStudent)
router.delete('/delete/:id',updateStudent)

export default router

