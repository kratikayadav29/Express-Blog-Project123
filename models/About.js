const mongoose = require('mongoose')


//define schema
const AboutSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    
})
const AboutModel = mongoose.model('about',AboutSchema)
module.exports=AboutModel