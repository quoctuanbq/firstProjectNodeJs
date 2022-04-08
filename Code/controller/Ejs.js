const express= require("express");
const app = express();
const port=3000;


app.set("view engine", "ejs");
app.set("views","./database");
// app.render("/test");
app.get('/', function(req, res){
    res.render("test");
})








app.listen(port,()=>{
    console.log(`Sever is listening in ${port}`);
})