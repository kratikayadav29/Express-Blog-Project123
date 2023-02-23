const mongoose = require('mongoose')


//define schema
const CategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    image:     
    {
      public_id: {
        type: String,
        
      },
      url: {
        type: String,
         
      },
    }
    
})
const CategoryModel = mongoose.model('category',CategorySchema)
module.exports=CategoryModel