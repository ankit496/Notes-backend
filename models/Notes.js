const mongoose=require('mongoose')
const notesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        unique:true,
        required:true
    }
},{timestamps:true})
const Notes=mongoose.model('Notes',notesSchema)
module.exports=Notes