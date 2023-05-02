const service = require('./admin_service')
const adminuser = async(req,res)=>{

    const app = await service.adminlogin(req.body)
    res.send({"result":"data sucesfully"})
}

const getuser = async(req,res)=>{
    const user = await service.getadmin(req.body)
    res.send(user)
}
module.exports ={adminuser,getuser}