const BlogModel = require("../models/Blog")
const CategoryModel = require("../models/Category")

class FrontController{
    static home=async(req,res)=>{
        try{
            const data = await BlogModel.find()
            //console.log(data)
            res.render('home',{d:data})
        }catch(err){
            console.log(err)
        }
        // res.send('homepage')
        
    }

    static detail = async(req,res)=>{
        try{
            const data =await BlogModel.findById(req.params.id)
            const category =await CategoryModel.find()
            const recentblog =await BlogModel.find()
            res.render('detail',{d:data,c:category,r:recentblog})
        }catch(err){
            console.log(err)
        }
    }

    static about=(req,res)=>{
        // res.send('aboutpage')
        res.render('about')
    }

    static blog=async(req,res)=>{
        try{
            const data = await BlogModel.find()
            //console.log(data)
            res.render('blog',{d:data})
        }catch(err){
            console.log(err)
        }
        // res.send('homepage')
        
    }

    static detail = async(req,res)=>{
        try{
            const data =await BlogModel.findById(req.params.id)
            const category =await CategoryModel.find()
            const recentblog =await BlogModel.find()
            res.render('detail',{d:data,c:category,r:recentblog})
        }catch(err){
            console.log(err)
        }
    }

    static contact=(req,res)=>{
        // res.send('aboutpage')
        res.render('contact')
    }

    static login=(req,res)=>{
        // res.send('aboutpage')
        res.render('login')
    }
}

module.exports=FrontController