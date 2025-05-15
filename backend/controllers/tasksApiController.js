const Task = require("../models/Task");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const global = require('../_helper/GlobalHelper');
const randomString = require("randomstring");
const mail = require("../config/mail");

module.exports ={
    index,
    create,
    edit,
    update,
    destroy,
};

// async function index(req,res){
//     try{
//         const tasks = await Task.findOne({});
//         if(!tasks){
//            return res.status(401).json({ status: true, data:[]});
//         }
//         res.status(200).json({ status: true, data: priority });
//     }catch(error){
//        console.log('Registration failed:',error);
//        res.status(500).send("Internal server error");
//     }
// }

async function index(req, res) {
  try {
    const tasks = await Task.find({ isDeleted: false }).populate('priorityId');
    return res.status(200).json({ status: true, data: tasks });
  } catch (error) {
    console.error('Fetch tasks failed:', error);
    res.status(500).send("Internal server error");
  }
}





async function create(req,res){
    const{ name } = req.body;
    try{
        const task = await Task.findOne({name});
        if(task){
           return res.status(401).json({ status: true, message: "Task Name is already in use" });
        }
        await Task.create(req.body);
        res.status(200).json({ status: true, message: "Task Name created successfully!" });
    }catch(error){
       console.log('Registration failed:',error);
       res.status(500).send("Internal server error");
    }
}

async function edit(req,res){
    const {taskId} = req.body;
    try{
        const task = await Task.findById(taskId);
    if(!task){
         return res.status(401).json({status : false , data : task})
    } 
        res.status(200).json({status : true , data :task})
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Task  failed'});
    }
}

async function update(req,res){
    const{ taskId  } = req.body
    const updateData = { ...req.body };
    try{
        const task = await Task.findByIdAndUpdate(taskId,updateData ,{new:true}); 
        if(!task)  {
            return res.status(404).json({status: false ,error :'Task not found'})
        }
        res.status(200).json({status: true , task})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error:'profile update failed '});
    }
}  

async function destroy(req,res){
    try{ 
        let{taskId} = req.body
        let  result = await Task.findByIdAndDelete(taskId);
        res.status(200).json({ status:true ,message :'Task deleted successfully ' })
    }catch(error) {
        console.log(error);
        res.status(500).json({error : 'delete data failed'})   
    }
} 
