const BlogModel = require('../../models/Blog')
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dmxcaoj81', 
    api_key: '259733766285852', 
    api_secret: 'A30zqk7fUPuUYeBTtUEh3DriixA',
    //secure: true
  });
class BlogController{
    
    static display=async(req,res)=>{
        try{
            const data = await BlogModel.find()
            //console.log(data)
            res.render('admin/blog/display',{d:data})
        }catch(err){
            console.log(err)
        }
    }
    static bloginsert=async(req,res)=>{
        //console.log('hello')
        //console.log(req.files.image)
        const imagefile=req.files.image
        const myimage=await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:'blogimage'
        })
        //console.log(myimage)
        // const result = await BlogModel.create(req.body)
        // res.redirect('/admin/blog/display') //in redirect data will come from route
        const result = new BlogModel({
            title:req.body.title,
            description:req.body.description,
            image:{
                public_id:myimage.public_id,
                url:myimage.secure_url
            }
            
        })
        await result.save()
        res.redirect('/admin/blog/display')
    }
    static blogview = async(req,res)=>{

        try{
            // console.log(req.params.id)
            const result = await BlogModel.findById(req.params.id)
            //console.log(result)
            res.render('admin/blog/view',{view:result})

        }catch(err){
            console.log(err)
        }
    }

    static blogedit = async(req,res)=>{

        try{
            // console.log(req.params.id)
            const result = await BlogModel.findById(req.params.id)
            //console.log(result)
            res.render('admin/blog/edit',{edit:result})

        }catch(err){
            console.log(err)
        }
    }

    static blogupdate = async(req,res)=>{
        try{
            // console.log(req.body)
            // console.log(req.params.id)
            //image delete code
            const data = await BlogModel.findById(req.params.id)
            const image_id = data.image.public_id
            await cloudinary.uploader.destroy(image_id)
            //console.log(image_id)
            //image update code
            const imagefile=req.files.image
            const myimage=await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:'blogimage'
            })
            const result = await BlogModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                description:req.body.description,
                image:{
                    public_id:myimage.public_id,
                    url:myimage.secure_url
                }
            })
            await result.save()
            res.redirect('/admin/blog/display')

        }catch(err){
            console.log(err)
        }
    }

    static blogdelete = async(req,res)=>{

        try{
            const data = await BlogModel.findById(req.params.id)
            const image_id = data.image.public_id
            await cloudinary.uploader.destroy(image_id)
            // console.log(req.params.id)
            const result = await BlogModel.findByIdAndDelete(req.params.id)
            //console.log(result)
            res.redirect('/admin/blog/display')

        }catch(err){
            console.log(err)
        }
    }

}
module.exports=BlogController