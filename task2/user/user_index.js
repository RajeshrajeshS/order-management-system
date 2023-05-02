 const service = require("./user_service");
 const bcrypt = require("bcrypt");
const save001 = async(req,res)=>{
  const save1 = await service.save(req.body);
  if(save1 == true){
      res.send("Userdata imported Successfully")
  }else{res.send("Something went wrong")}
}


const login001 = async(req,res)=>{
  try {
      const login1 = await service.login(req.body.username);
      if (login1.length == 0) {
          res.send({"code":404,"status":"mismatch username"})
      }else{
          
          const isPasswordMatch = await bcrypt.compare(req.body.password, login1[0].password);
          console.log(isPasswordMatch);
          if (!isPasswordMatch) {
              return res.send({message:'Incorrect password'});
          }else{res.send({message: 'Login successful'});}
        }
    
    } 
    catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
}

const UpdateCustomer_Details = async(req,res)=>{
    try {
        let UpdateCustomer_Details1 = await service.Update_Customer(req.body);
        console.log(UpdateCustomer_Details1);
        if (!UpdateCustomer_Details1) {
            res.send("Not Updated")
        }else(res.send("Details updated"))
    } catch (error) {
        console.log(error);
        return false
    }
}


  
  module.exports ={save001,login001,UpdateCustomer_Details};
