const studentModel=require('../models/student')



const getAllStudents=async(req,res)=>{
  try{
   const students = await studentModel.find();
  res.status(200).json(students);
 }
 catch(error){
   // console.log(error);
   res.status(500).json({message:error.message})
 }
 }
 
 const postStudents =async(req,res)=>{
   
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
 }
const upadteStudents =async(req,res)=>{
   // res.send(`Updating Student details With Id ${req.params.id}`)
   if(req.body.name!=null){
     res.student.name=req.body.name;
   }
   if(req.body.enrolledDepartment!=null){
     res.student.enrolledDepartment=req.body.enrolledDepartment
   }
   try{
     const updateStudent=await res.student.save();
     res.status(201).json(updateStudent);
   }
   catch(error){
     res.send(400).json({message:error.message})
   }
 }
 
 const deleteStudents=async(req,res)=>{
   
   try{
    
     await res.student.deleteOne();
     res.json({message:`Deleted user ${res.student.name}`})
   }
   catch(error){
     res.status(400).json({message:error.message})
   }
 }
 
const getAStudent=(req,res)=>{
   // res.send(`Displaying Student details With Id ${req.params.id}`)
   res.status(201).json(res.student);
 }
 
 
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
 module.exports={getAllStudents,getAStudent,upadteStudents,postStudents,deleteStudents,getStudent};