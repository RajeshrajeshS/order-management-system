const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  username:{type:String,unique:true},
  emailId:{type:String,unique:true},
  password:{type:String},
  mobile_no:{type:Number,unique:true},
  Address:{type:String,required:true},
  City:{type:String,required:true},
  PostalCode:{type:Number,required:true},
  Country:{type:String,required:true},
  created_at: { type: Date, default: Date.now },
});

const model = mongoose.model("User", UserSchema);

const save = async(data)=>{
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = new model({username:data.username,
            emailId:data.emailId,
            password:hashedPassword,
            mobile_no:data.mobile_no,

Address:data.Address,
City:data.City,
PostalCode:data.PostalCode,
Country:data.Country});
const user1 = await user.save();
return true     
} catch (error) {
console.log(error);
return false
}
}

let login = async(data)=>{
let login1 = await model.aggregate([{$match:{username:data}}]);
return login1
}

const Update_Customer = async(data)=>{
  const hashedPassword = await bcrypt.hash(data.password, 10)
  let Update_Customer1 = await model.findOneAndUpdate({
      emailId:data.emailId,mobile_no:data.mobile_no},
      {$set:{
      'username':data.username,
      'password':hashedPassword,
      'Address':data.Address,
      'City':data.City,
      'PinCode':data.PinCode,
      'Country':data.Country}})
      return Update_Customer1
}


module.exports ={save,login,model,Update_Customer};