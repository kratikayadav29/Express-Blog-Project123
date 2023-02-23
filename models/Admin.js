const mongoose = require('mongoose')


//define schema
const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
    
},{timestamps:true})
const AdminModel = mongoose.model('admin',AdminSchema)
module.exports=AdminModel