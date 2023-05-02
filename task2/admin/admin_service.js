const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({

  username: String,
  emailID:String,
  password: String 
});

const admin = mongoose.model('admin',AdminSchema)
const adminlogin = async(list)=>{
    try {
    const data1 = await new admin(list).save()
    return true
    } catch (error) {
        console.log(error)
        return false
    }
}

const getadmin = async()=>{
  const admin01 = await admin.find()
  return admin01
}

module.exports ={adminlogin,getadmin}
