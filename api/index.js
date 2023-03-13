const express = require("express");
const app = express();
app.use(express.json())
//app.use(express.urlencoded({extended: false}))
const cors = require("cors")

app.use(cors({
    origin : "*"
}))

require("./src/rout/customerRout")(app);

var port = 8081
app.listen(port, ()=>{
    console.log("http://localhost:"+port)
})
