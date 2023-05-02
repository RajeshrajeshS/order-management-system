const mongoose = require('mongoose');
const User_Service = require('../user/user_service')
const product_service = require('./service')
const date = require('date-and-time');
// const OrderSchema = mongoose.Schema({
//         PRODUCT_ID:{type:String},
//         username:{type:String},
//         productname:{type:String},
//         price:{type:String},
//         date:{type:String},
//         quantity:{type:Number},
//         status:{type:String}
// })

const OrderSchema = mongoose.Schema({
  PRODUCT_ID: { type: String },
  username: { type: String },
  productname: { type: String },
  price: { type: String },
  date: { type: String }, // set default value to current date default: Date.now()
  quantity: { type: Number },
  shipping_address: {
    name: String,
    door_no: String,
    street: String,
    landmark: String,
    town: String,
    city: String,
    state: String,
    country: String,
    pincode: Number,
    mob_no: Number
  },
  status: { type: String }
});


const OrderModel = mongoose.model("listorder",OrderSchema);
const SaveOrder = async (data) => {
    try {
        const now  =  new Date();
        const value = date.format(now,'YYYY/MM/DD HH:mm:ss')
        // const existingOrder = await OrderModel.findOne({ orderid: data.orderid });
        // if (existingOrder) {
        //     throw new Error(`Order with orderid ${data.orderid} already exists`);
        // }
        const save1 = await OrderModel({
            PRODUCT_ID: data.PRODUCT_ID,
            username: data.username,
            productname: data.productname,
            price: data.price,
            date: value,
            quantity: data.quantity,
            shipping_address: {
              name: data.name,
              door_no: data.door_no,
              street: data.street,
              landmark: data.landmark,
              town: data.town,
              city: data.city,
              state: data.state,
              country: data.country,
              pincode: data.pincode,
              mob_no: data.mob_no
            },
            status: data.status
        }).save();
    
        return save1;
    } catch (error) {
        console.log(error);
        return false;
}
};
const User_Match = async(data)=>{
    const User_Match1 = await User_Service.model.aggregate([{$match:{"username":data}}])
    return User_Match1
}
const Product_Match = async(data)=>{
    const Product_Match1 = await product_service.csv1.aggregate([{$match:{"PRODUCT_ID":data}}]);
    //console.log(Product_Match1);
    return Product_Match1
}

// const get_order = async(data)=>{
//     const data01 = await OrderModel.findOne("username")
//     return data01
// }

const Customer_Purchase_Detail = async(data) => {
  console.log(data);
  const detail = await OrderModel.aggregate([{$match:{username:data.username}}]); 
  console.log(detail);
  return detail;
};



const get_order = async (data) => {
    try {
      const order = await OrderModel.find({ username:data});
      return order;
    } catch (error) {
    //   console.log(error);
      return null;
    }
  }

  const Update_Orderlist = async(data)=>{
    const now  =  new Date();
    const value = date.format(now,'YYYY/MM/DD HH:mm:ss')
    const Update_Order1 = await OrderModel.findOneAndUpdate({"username":data.username,"productname":data.productname},{$set:{
        //'productname': data.productname,
        
        "price": data.price,
        "date": value, // set default value to current date default: Date.now()
        "quantity": data.quantity,
        "shipping_address.name": data.name,
        "shipping_address.door_no": data.door_no,
        "shipping_address.street": data.street,
        "shipping_address.landmark": data.landmark,
        "shipping_address.town": data.town,
        "shipping_address.city": data.city,
        "shipping_address.state": data.state,
        "shipping_address.country": data.country,
        "shipping_address.pincode": data.pincode,
        "shipping_address.mob_no": data.mob_no,
        "status": data.status
}});
return Update_Order1
  }
 
  

module.exports = {SaveOrder,OrderModel,User_Match,Product_Match,
  get_order,Customer_Purchase_Detail,Update_Orderlist}



