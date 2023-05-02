const express = require('express')
const router = express.Router()
const file1 = require('../controler/index')
const multer = require('../multer/multer')
const b1 = require('../user/user_index')
const b2 = require('../admin/admin_index')
const b3 = require('../controler/order_index')
const b4 = require('../view_order/view_index')
let routes = (app)=>{
    router.post('/file',multer.single('upload'),file1.uploadEmpDetailFile)
    // user
    router.post('/save',b1.save001)
    router.post('/log',b1.login001)
    router.put('/passwordupdate',b1.UpdateCustomer_Details)
    router.get('/get',file1.getproduct)
    // admin
    router.post('/admin',b2.adminuser)
    // order
    router.post('/productsave',b3.ProductDetails)
    router.get('/getorder',b3.order_user)
    router.get('/getdetails',b3.CustomerPurchaseDetail)
    router.put('/orderupdate',b3.UpdateOrder)
    
    app.use('/api',router)
}
module.exports = routes