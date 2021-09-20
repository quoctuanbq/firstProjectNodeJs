const express = require("express");
const app=express();
const bodyParser = require("body-parser");
const path = require("path");
const productRouter= require("./Router/getProduct")
const filter = require("./Router/setFilter")
const port= process.env.PORT||3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname,"../public")))
app.use('/product',productRouter);
app.use('/filter',filter)


app.get("/",(req, res) =>{
    res.sendFile(path.join(__dirname,"../public/html/home.html"))
})
app.get("/sale",(req, res) =>{
    res.sendFile(path.join(__dirname,"../public/html/sale.html"))
})
app.get("/d",(req, res)=>{
    console.log(req.body.cat+"d")
})




app.listen(3000);