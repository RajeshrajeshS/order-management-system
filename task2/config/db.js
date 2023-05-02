const mongoose = require('mongoose')
const DBURL = process.env.DBURL;
mongoose.connect(DBURL)

mongoose.connection.on('connected',()=>{
    console.log("mongoose connected");
});

mongoose.connection.on('disconnected',()=>{
  console.log("mongoose disconnected");
});

mongoose.connection.on('error',(err)=>{
  console.log(`${err}wile connected`);
});