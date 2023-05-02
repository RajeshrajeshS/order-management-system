const csv02 = require('./service')
const CSVtoJSON = require('csvtojson')


const uploadEmpDetailFile = async (req, res) => {
    try {
        if (req.file == undefined) {
            res.send({ code: 400, Message: "Please upload csv file..!" })
        }
        let path = "./upload/" + req.file.filename
        let Details = await CSVtoJSON().fromFile(path)
        // console.log(Details);
        //const saveDetail = await csv02.csvfile(Details)
        // if (Details) {
            for(const item of Details){
                // const products = await CSVtoJSON().fromFile(path); 
      
                
                  
                  const value= await csv02.getproductdetails({PRODUCT_ID:item.PRODUCT_ID})
                  
                  if(value.length===0){
                    var product1=await csv02.csvfile(item)
                  }
                else{
                  
                  const product3=await csv02.updateproductdetails1(item)
                }}
              
              console.log(product1);
              res.send({ code: 200, result: "Success", message: "Product Upload Successfully !!!"});
            }
             catch (error) {
              res.status(500).send({
                message: "Could not upload the file!!" });
            }
          };
                // const saveDetail = await csv02.csvfile(item)
                
                // const saveDetail01 = await csv02.updateproductID(saveDetail);
            //     console.log(saveDetail01)
            // res.send({ code: 200, Message: "Successfully uploaded...!" })
        
        // else{res.send({ code: 202, Message: "Not uploaded...!" })}
        

    //  catch (error) {
    //     console.log(error);
    //     res.send({ code: 400, Message: "something went wrong"})
    //     return false

    // }

const getproduct=async(req,res)=>{
    let viewproduct=await csv02.getproductdetails(req.query);
    if(viewproduct){
      res.send({code:200,Result:viewproduct})    
    }
    else{
      res.send({code:400,Message:"Can't fetch the product details"})
    }
}
module.exports ={uploadEmpDetailFile,getproduct}