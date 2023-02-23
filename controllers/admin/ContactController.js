const ContactModel = require("../../models/Contact")

class ContactController{
    static display=async(req,res)=>{
        const data = await ContactModel.find()
        //console.log(data)
        res.render('admin/contact/display',{d:data})
    }
    static contactinsert=async(req,res)=>{
        try{
            console.log(req.body)
            const result=await ContactModel.create(req.body)
            res.redirect('/contact')
        }catch(err){
            console.log(err)
        }
    }
    static contactview = async(req,res)=>{

        try{
            // console.log(req.params.id)
            const result = await ContactModel.findById(req.params.id)
            //console.log(result)
            res.render('admin/contact/view',{view:result})

        }catch(err){
            console.log(err)
        }
    }

    static contactedit = async(req,res)=>{

        try{
            // console.log(req.params.id)
            const result = await ContactModel.findById(req.params.id)
            //console.log(result)
            res.render('admin/contact/edit',{edit:result})

        }catch(err){
            console.log(err)
        }
    }

    static contactupdate = async(req,res)=>{
        try{
            // console.log(req.body)
            // console.log(req.params.id)
            const result = await ContactModel.findByIdAndUpdate(req.params.id,{
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                message:req.body.message
            })
            await result.save()
            res.redirect('/admin/contactdisplay')

        }catch(err){
            console.log(err)
        }
    }

    static contactdelete = async(req,res)=>{

        try{
            // console.log(req.params.id)
            const result = await ContactModel.findByIdAndDelete(req.params.id)
            //console.log(result)
            res.redirect('/admin/contactdisplay')

        }catch(err){
            console.log(err)
        }
    }

}
module.exports=ContactController