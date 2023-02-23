// class CategoryController{
//     static display=async(req,res)=>{
//         res.render('admin/category/display')
//     }
// }
// module.exports=CategoryController

const CategoryModel = require('../../models/Category')
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dmxcaoj81', 
    api_key: '259733766285852', 
    api_secret: 'A30zqk7fUPuUYeBTtUEh3DriixA',
    //secure: true
  });
class CategoryController{
    
    static display=async(req,res)=>{
        try{
            const data = await CategoryModel.find()
            //console.log(data)
            res.render('admin/category/display',{d:data})
        }catch(err){
            console.log(err)
        }
    }
    static categoryinsert=async(req,res)=>{
        //console.log('hello')
        //console.log(req.files.image)
        const imagefile=req.files.image
        const myimage=await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:'categoryimage'
        })
        //console.log(myimage)
        // const result = await CategoryModel.create(req.body)
        // res.redirect('/admin/categorydisplay') //in redirect data will come from route
        const result = new CategoryModel({
            title:req.body.title,
            description:req.body.description,
            image:{
                public_id:myimage.public_id,
                url:myimage.secure_url
            }
            
        })
        await result.save()
        res.redirect('/admin/categorydisplay')
    }
    static categoryview = async(req,res)=>{

        try{
            // console.log(req.params.id)
            const result = await CategoryModel.findById(req.params.id)
            //console.log(result)
            res.render('admin/category/view',{view:result})

        }catch(err){
            console.log(err)
        }
    }
    static categoryedit = async(req,res)=>{

        try{
            // console.log(req.params.id)
            const result = await CategoryModel.findById(req.params.id)
            //console.log(result)
            res.render('admin/category/edit',{edit:result})

        }catch(err){
            console.log(err)
        }
    }
    static categoryupdate = async(req,res)=>{
        try{
            // console.log(req.body)
            // console.log(req.params.id)
            //image delete code
            const data = await CategoryModel.findById(req.params.id)
            const image_id = data.image.public_id
            // await cloudinary.uploader.destroy(image_id)
            //console.log(image_id)
            //image update code
            const imagefile=req.files.image
            const myimage=await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:'categoryimage'
            })
            const result = await CategoryModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                image:{
                    public_id:myimage.public_id,
                    url:myimage.secure_url
                }
            })
            await result.save()
            res.redirect('/admin/categorydisplay')

        }catch(err){
            console.log(err)
        }
    }
    static categorydelete = async(req,res)=>{

        try{
            // console.log(req.params.id)
            const result = await CategoryModel.findByIdAndDelete(req.params.id)
            //console.log(result)
            res.redirect('/admin/categorydisplay')

        }catch(err){
            console.log(err)
        }
    }

}
module.exports=CategoryController