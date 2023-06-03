const express=require('express')
const router=express.Router()
const {getAllStudents,postStudents,upadteStudents,deleteStudents,getAStudent,getStudent}=require('../controllers/student')
router.route('/').get(getAllStudents).post(postStudents)

router.route('/:id').get(getStudent,getAStudent).patch(getStudent,upadteStudents).delete(getStudent,deleteStudents)

module.exports=router;