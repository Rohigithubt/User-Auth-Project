const Priority = require("../models/Priority");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const global = require('../_helper/GlobalHelper');
const randomString = require("randomstring");
const mail = require("../config/mail");
const User = require("../models/User");



module.exports ={
    index,
    create,
    edit,
    update,
    destroy,
};

async function index(req,res){
    try{
    const{ userId } = req.body;
        // console.log(userId,"userIduserId");
        
        const priority = await Priority.find({isDeleted: false,createdBy: userId,}).sort({'created_at':-1});
        if(!priority){
           return res.status(401).json({ status: true, message: "Name is already in use" });
        }
        res.status(200).json({ status: true, data: priority });
    }catch(error){
       console.log('Registration failed:',error);
       res.status(500).send("Internal server error");
    }
}

async function create(req,res){
    const{ name } = req.body;
    try{
        const priority = await Priority.findOne({name});
        if(priority){
           return res.status(401).json({ status: true, message: "Name is already in use" });
        }
        await Priority.create(req.body);
        res.status(200).json({ status: true, message: "Name created successfully!"});
    }catch(error){
       console.log('Registration failed:',error);
       res.status(500).send("Internal server error");
    }
}

async function edit(req,res){
    const {priorityId} = req.body;
    try{
        const priority = await Priority.findById(priorityId);
    if(!priority){
         return res.status(401).json({status : false , message:'No Data Found'})
    } 
        res.status(200).json({status : true , data :priority})
    }catch(error){
        console.log(error);
        res.status(500).json({error:'editprofile  failed'});
    }
}
async function update(req,res){
    const{ priorityId  } = req.body
    const updateData = { ...req.body };
   
    try{
        const priority = await Priority.findByIdAndUpdate(priorityId,updateData ,{new:true}); 
        if(!priority)  {
            return res.status(404).json({status: false ,error :'User not found'})
        }
        res.status(200).json({status: true , priority})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error:'profile update failed '});
    }
}  
async function destroy(req,res){
    try{ 
    let{priorityId} = req.body
    
    let  result = await Priority.findByIdAndDelete(priorityId);
    res.status(200).json({ status:true ,message :'Priority deleted successfully ' })
    }catch(error) {
        console.log(error);
        res.status(500).json({error : 'delete data failed'})   
     }
} 
















// ----------------------------------------------------------------------





/* 
const Priority = require("../models/Priority");
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

async function index(req,res){
    try{
        const priority = await Priority.find({isDeleted: false}).sort({'created_at':-1});
        if(!priority){
           return res.status(401).json({ status: true, message: "Name is already in use" });
        }
        res.status(200).json({ status: true, data: priority });
    }catch(error){
       console.log('Registration failed:',error);
       res.status(500).send("Internal server error");
    }
}

async function create(req,res){
    const{ name } = req.body;
    try{
        const priority = await Priority.findOne({name});
        if(priority){
           return res.status(401).json({ status: true, message: "Name is already in use" });
        }
        await Priority.create(req.body);
        res.status(200).json({ status: true, message: "Name created successfully!" });
    }catch(error){
       console.log('Registration failed:',error);
       res.status(500).send("Internal server error");
    }
}

async function edit(req,res){
    const {priorityId} = req.body;
    try{
        const priority = await Priority.findById(priorityId);
    if(!priority){
         return res.status(401).json({status : false , message:'No Data Found'})
    } 
        res.status(200).json({status : true , data :priority})
    }catch(error){
        console.log(error);
        res.status(500).json({error:'editprofile  failed'});
    }
}
async function update(req,res){
    const{ priorityId  } = req.body
    const updateData = { ...req.body };
   
    try{
        const priority = await Priority.findByIdAndUpdate(priorityId,updateData ,{new:true}); 
        if(!priority)  {
            return res.status(404).json({status: false ,error :'User not found'})
        }
        res.status(200).json({status: true , priority})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error:'profile update failed '});
    }
}  
async function destroy(req,res){
    try{ 
    let{priorityId} = req.body
    
    let  result = await Priority.findByIdAndDelete(priorityId);
    res.status(200).json({ status:true ,message :'Priority deleted successfully ' })
    }catch(error) {
        console.log(error);
        res.status(500).json({error : 'delete data failed'})   
     }
} 
// */