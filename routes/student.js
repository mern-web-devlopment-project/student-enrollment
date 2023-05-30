const express=require('express')
const router=express.Router()
const studentModel=require('../models/student')

router.get('/',async(req,res)=>{
 try{
  const students = await studentModel.find();
 res.status(200).json(students);
}
catch(error){
  // console.log(error);
  res.status(500).json({message:error.message})
}
})

router.post('/',async(req,res)=>{
  const newStudent = new studentModel({
    name:req.body.name,
    enrolledDepartment:req.body.enrolledDepartment,
    enrollmentDate:req.body.enrollmentDate
  })
  try{
    const student =await newStudent.save();
    res.status(201).json(student);
  }
  catch(error){
    res.status(500).json({message:error.message})
  }
})
router.patch('/:id',(req,res)=>{
  res.send(`Updating Student details With Id ${req.params.id}`)
})

router.delete('/:id',(req,res)=>{
  res.send(`Deleting Student details With Id ${req.params.id}`)
})

router.get('/:id',getStudent,(req,res)=>{
  // res.send(`Displaying Student details With Id ${req.params.id}`)
  res.status(201).json(res.student);
})


async function getStudent(req,res,next){
  let student
  try{
    student=await studentModel.findById(req.params.id)
    if(student==null){
      return res.status(404).json({message:`cannot find user with id ${req.params.id}`})
    }
  }
  catch(error){
    return res.status(500).json({message:error.message})
  }
  res.student=student
  next();
}
module.exports=router;