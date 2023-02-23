const AdminModel = require('../../models/Admin')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')

class AdminController{
    static dashboard=(req,res)=>{
        const {name,email} = req.data
        res.render('admin/dashboard',{n:name,e:email})
    }
    static register=(req,res)=>{
        res.render('admin/register',{message:req.flash('error')})
    }
    static register1=async(req,res)=>{
        //console.log(req.body)
        try{
            const {name,e,password,cpass}=req.body
            const admin = await AdminModel.findOne({email:e})
            if(admin){
                req.flash('error','Email already exist')
                res.redirect('/register')
            }else{
                if(name && e && password && cpass){
                    const hashPassword = await bcrypt.hash(password,10)
                    if(password == cpass){
                        const result = new AdminModel({
                            name:name,
                            email:e,
                            password:hashPassword,
                            
                        })
                        await result.save()
                        res.redirect('/login')
                    }else{
                        req.flash('error','Password and Confirm Password does not match')
                        res.redirect('/register')
                    }
                }else{
                    req.flash('error','All field are required')
                    res.redirect('/register')
                }
            }
        }catch(err){
            console.log(err)
        }
    }

    static verifylogin = async(req,res)=>{
        try{
           // console.log(req.body)
           const {email,password} = req.body
           if(email && password){
            const admin = await AdminModel.findOne({email:email})
            if(admin != null){
                const ismatched = await bcrypt.compare(password,admin.password)
                if((admin.email === email) && ismatched){
                    const token = jwt.sign({Id:admin._id},'kratika123456ab')
                    //console.log(token)
                    res.cookie('token',token)
                    res.redirect('/admin/dashboard')
                }
            }else{
                req.flash('error','You are not a registered admin')
                res.redirect('/login')
            }
           }else{
                req.flash('error','All field are required')
                res.redirect('/login')
           }
        }catch(err){
            console.log(err)
        }
    }

    static logout = async(req,res)=>{
        try{
            res.clearCookie('token')
            res.redirect('/login')
        }catch(err){
            console.log(err)
        }
    }
}
module.exports=AdminController