const jwt = require('jsonwebtoken')
const AdminModel = require('../models/Admin')

const authentication = async(req,res,next)=>{
    //console.log('hello')
    //console.log(token)
    try{
        const {token} = req.cookies
        const verify = jwt.verify(token,'kratika123456ab')
        const data = await AdminModel.findOne({_id:verify.Id})
        req.data = data
        //console.log(data)
        //console.log(verify)
        next()
    }catch(err){
        res.redirect('/login')
    }
}

module.exports = authentication