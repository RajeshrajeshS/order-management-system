const app = require('express')()
require('dotenv').config()
require('./config/db')
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

require('./router/routes')(app)
let port = 3300;
app.listen(port,()=>{
    console.log(`server listening on port:${port}`);
});