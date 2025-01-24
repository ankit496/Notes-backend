const Notes=require('../models/Notes')
const addTask=async(req,res)=>{
    try{
        const userId=req.id
        const {title,description}=req.body
        const task=await Notes.findOne({description:description})
        if(task)
            return res.status(403).json("Note already exist")
        const newtask=await Notes.create({user:userId,title:title,description:description})
        return res.status(200).json(newtask)
    }
    catch(err){
        return res.status(500).json(err)
    }
}
const updateTask=async(req,res)=>{
    const { title, description } = req.body
    const newData = {};
    if (title) { newData.title = title }
    if (description) { newData.description = description }
    try {
        let notes = await Notes.findById(req.params.id)
        if (!notes)
            res.status(404).send('Note not found')
        if (notes.user.toString() !== req.id)
            res.status(401).send('Not allowed')
        task = await Notes.findByIdAndUpdate(req.params.id, { $set: newData }, { new: true })
        return res.status(200).json(task)
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}
const deleteTask=async(req,res)=>{
    try{
        let task = await Notes.findById(req.params.id)
        if (!task)
            return res.status(404).send('Note not found')
        if (task.user.toString() !== req.id)
            return res.status(401).send('Not allowed')
        task = await Notes.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: 'successfully deleted the note' })
    }
    catch(error){
        return res.status(500).json({message:'Internal server error'})
    }
}
const fetchAllTasks=async(req,res)=>{
    try{
        const userId=req.id;
        if(!userId)
            return res.status(403).json("User not authorized")
        const tasks=await Notes.find({user:userId})
        return res.status(200).json(tasks)
    }
    catch(error){
        return res.status(500).json({message:'Internal server error'})
    }
}
const getTask=async(req,res)=>{
    try{
        const {id}=req.params;
        const task=await Notes.findById(id)
        return res.status(200).json(task)
    }
    catch(error){
        return res.status(500).json({message:'Internal server error'})
    }
}
module.exports={
    addTask,
    updateTask,
    deleteTask,
    fetchAllTasks,
    getTask
}