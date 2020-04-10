 const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const fs = require("fs")
const cors = require('cors')

 const app = express();

 const port = 8080;

 app.use(cors())

 app.use('/public',express.static(path.join(__dirname,"/public")))

 app.use(bodyParser.urlencoded({extended:false}))

app.get(["/:id","*"],(req,res)=>{
    if(req.params.id==undefined) req.params.id=""
    fs.exists(path.join(__dirname,"public/podcasts",req.params.id,"info.json"),(exists)=>{
        if(exists) {
            //Podcasts Exists
            res.send(req.params.id)
        } else {
            //Show home
            res.sendFile(path.join(__dirname,"public","index.html"))
        }
    })
})

 app.listen(port,()=>{
     console.log("Running...")
 })