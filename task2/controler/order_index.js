const Order_Service = require('../controler/order_service')
const shippingmodel = require('../user/user_service')
const date = require('date-and-time');
//Order was made, once the details are match with PRODUCT_ID and username,otherwise it falls in mismatch Details 
const ProductDetails = async(req,res)=>{
    try {
        const ProductMatch = await Order_Service.Product_Match(req.body.PRODUCT_ID)
        const UserMatch = await Order_Service.User_Match(req.body.username)
        if (ProductMatch[0].PRODUCT_ID == req.body.PRODUCT_ID) {
            console.log(ProductMatch[0].PRODUCT_ID);
            if (UserMatch[0].username == req.body.username) {
                const Save1 = await Order_Service.SaveOrder(req.body);
                res.send({"Message":"Your Order was Placed"})
                
            }else{res.send({"Message":"Kindly Select Appropriate Product"})}
            
        }else{console.log(ProductMatch[0].PRODUCT_ID);
            res.send({"Message":"Invalid User/product Credentials"})}
        } catch (error) {
            console.log(error);
            return res.send("Mismatch Details")
        }
    }

    const CustomerPurchaseDetail = async(req,res)=>{
        try {
            const Customer_Purchase_Detail1 = await Order_Service.Customer_Purchase_Detail(req.body)
            const Customer_Details = await shippingmodel.model.aggregate([{$match:{username:req.body.username}}]);
            if((Customer_Purchase_Detail1[0].username == req.body.username)&&(Customer_Details[0].username == req.body.username)){
                res.send({Purchased_Order:Customer_Purchase_Detail1,Shipping_Address:Customer_Details})
            }else{res.send("data not found")}
        } catch (err) 
        { console.log(err)
             return false
             
        }}



    const order_user = async(req,res)=>{
        const index = await Order_Service.get_order(req.body.username)
        res.send(index)

    }

    const update = async (req, res) =>{
     const update1 = await Order_Service.updateproductdetails(req.body)
    if(update1)
    {res.send("Price update sucessfuly")}
    else{
        res.send("something went worng")
    }
    
    }

    const UpdateOrder = async(req,res)=>{
        const Update_Order1 = await Order_Service.Update_Orderlist(req.body);
        console.log(Update_Order1)
        if(Update_Order1){
         res.send({Message:"Data was updated"})
        }else(res.send({Message:"Kindly check product name and username"}))
     }

    module.exports = {ProductDetails,order_user,CustomerPurchaseDetail,update,UpdateOrder}






