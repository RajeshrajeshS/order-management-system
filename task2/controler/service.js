const csvtojson = require('csvtojson')
const mongoose = require('mongoose')
const task02 = mongoose.Schema({
  S_no:{type:Number},
  CATEGORY:{type:String},
  SUB_CATEGORY:{type:String},
  PRODUCT_ID:{type:String},
  BRAND:{type:String},
  MODEL:{type:String},
  COLOR:{type:String},
  STOCKS:{type:String}, 
  PRODUCT_DESCRIPTION:{type:String},
  PRICE:{type:String},
  DISCOUNT:{type:String}
});
const csv1 = mongoose.model('file',task02)

const csvfile = async(data)=>{
  try {
    const save1 = await new csv1(data).save()
    return true
  } catch (error) {
    console.log(error)
    return false
  } 
}
const getproductdetails = async (data) => {
  try {

      var query = [];
      var product;

      if (data.PRODUCT_ID) {
          query.push({ $match: { "PRODUCT_ID": data.PRODUCT_ID} })
          product = await csv1.aggregate([
              query
          ]);
      }
      else {
          product = await csv1.find({})
      }
      return product;
  } catch (err) {
      return false
  }
};

const updateproductdetails1 = async (data) => {
  try {
      const users = await csv1.updateMany(
          { PRODUCT_ID:data.PRODUCT_ID},
          {
              $set: {
                "S_No":data.S_No,
                "CATEGORY":data.CATEGORY,
                "SUB_CATEGORY":data.SUB_CATEGORY,
                "BRAND":data.BRAND,
                "MODEL":data.MODEL,
                "COLOR":data.COLOR,
                "STOCKS":data.STOCKS,
          "PRODUCT_DESCRIPTION":data.PRODUCT_DESCRIPTION,
                "PRICE":data.PRICE,
                "DISCOUNT":data.DISCOUNT
                  // "isActive":data.isActive
              }
          },
          {new:true}
      );

      return users;
  } catch (err) {
      return false
  }
};




module.exports = {csvfile,getproductdetails,updateproductdetails1,csv1}


// const updateproductID = async (data)=>{
//   const upadate = await csv1.findOneAndUpdate(

//     {PRODUCT_ID:data.PRODUCT_ID},
//   {$set:{
//     "PRODUCT_ID":"ID"+Date.now(),
//   }}
//   )
//   return upadate
// }