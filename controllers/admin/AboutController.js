const AboutModel = require('../../models/About')
class AboutController{
    
    static display=async(req,res)=>{
        try{
            const data = await AboutModel.find()
            //console.log(data)
            res.render('admin/about/display',{d:data})
        }catch(err){
            console.log(err)
        }
    }
    static aboutinsert=async(req,res)=>{
        //console.log('hello')
        //console.log(req.body.title)
        const result = await AboutModel.create(req.body)
        res.redirect('/admin/aboutdisplay') //in redirect data will come from route
    }
    static aboutview = async(req,res)=>{

        try{
            // console.log(req.params.id)
            const result = await AboutModel.findById(req.params.id)
            //console.log(result)
            res.render('admin/about/view',{view:result})

        }catch(err){
            console.log(err)
        }
    }
    static aboutedit = async(req,res)=>{

        try{
            // console.log(req.params.id)
            const result = await AboutModel.findById(req.params.id)
            //console.log(result)
            res.render('admin/about/edit',{edit:result})

        }catch(err){
            console.log(err)
        }
    }
    static aboutupdate = async(req,res)=>{
        try{
            // console.log(req.body)
            // console.log(req.params.id)
            const result = await AboutModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
            })
            await result.save()
            res.redirect('/admin/aboutdisplay')

        }catch(err){
            console.log(err)
        }
    }
    static aboutdelete = async(req,res)=>{

        try{
            // console.log(req.params.id)
            const result = await AboutModel.findByIdAndDelete(req.params.id)
            //console.log(result)
            res.redirect('/admin/aboutdisplay')

        }catch(err){
            console.log(err)
        }
    }

}
module.exports=AboutController