const mongoose = require('mongoose')

//const url = "mongodb+srv://kratikay29:Kratika@29@cluster0.wmgtyrh.mongodb.net/BlogWebsite?retryWrites=true&w=majority"
const url1 = "mongodb+srv://kratikay29:kratikay@cluster0.pwcd3xj.mongodb.net/?retryWrites=true&w=majority"
//const uri ="mongodb+srv://admission123:12345678V@cluster0.b0ibf.mongodb.net/blog123?retryWrites=true&w=majority"
const connectdb = ()=>{
    //return mongoose.connect('mongodb://127.0.0.1:27017/BlogWebsite')
    return mongoose.connect(url1)
    .then(()=>{
        console.log('connection successfully')
    })
    .catch((error)=>{
        console.log(error)
    })
}
module.exports=connectdb