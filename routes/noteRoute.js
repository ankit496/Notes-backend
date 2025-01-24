const express=require('express')
const {addTask, updateTask, deleteTask, fetchAllTasks,getTask}=require('../controllers/notesController')
const validateUser=require('../middleware/validateUser')
const router=express.Router()
router.get("/",(req,res)=>{
    return res.statusCode(200).json("hii")
})
router.get("/getNote",validateUser,fetchAllTasks)
router.post("/addNote",validateUser,addTask)
router.get("/getById/:id",validateUser,getTask)
router.put("/updateNote/:id",validateUser,updateTask)
router.delete("/deleteNote/:id",validateUser,deleteTask)
module.exports=router