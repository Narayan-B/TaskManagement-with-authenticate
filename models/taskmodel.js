const User=require('./usermodel')
const mongoose=require('mongoose')
const {Schema,model}=mongoose
const taskSchema=new Schema({
 createdBy:{
  type:Schema.Types.ObjectId,
  ref:User
 },
  taskTitle:String,
  description:String,
  priority:String,
  Status:String,
  dueDate:String,
  userAssignments:[Schema.Types.ObjectId]
    
},{timestamps:true})
const Task=model('Task',taskSchema)
module.exports=Task
