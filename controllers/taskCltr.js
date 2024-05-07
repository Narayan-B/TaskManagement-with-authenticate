const Task=require('../models/taskmodel')
const {validationResult} =require('express-validator')
const taskCltr={}
taskCltr.create=async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    const user=req.user
    
    
    try{
        const task=new Task(body)
         task.createdBy=user.id
        
        await task.save()
        res.json(task)


    }catch(err){
        console.log(err)
        res.status(500).json({err:'something went wrong'})
    }
}
taskCltr.getAllTaskTitles = async (req, res) => {
    try {
        const tasks = await Task.find(); // Retrieve only the taskTitle field
        res.json( tasks );
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
taskCltr.update=async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const taskId = req.params.id;
        const body = req.body;
    
        try {
            const updatedTask = await Task.findByIdAndUpdate(taskId, body, { new: true });
    
            if (!updatedTask) {
                return res.status(404).json({ error: 'Task not found' });
            }
    
            res.json(updatedTask);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
taskCltr.delete = async (req, res) => {
        const taskId = req.params.id;
    
        try {
            const deletedTask = await Task.findByIdAndDelete(taskId);
    
            if (!deletedTask) {
                return res.status(404).json({ error: 'Task not found' });
            }
    
            res.json({ message: 'Task deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
module.exports=taskCltr