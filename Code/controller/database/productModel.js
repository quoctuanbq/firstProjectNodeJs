const mongoose = require('mongoose')


 mongoose.connect('mongodb://localhost/cloudshop', {
  useNewUrlParser: true,
 useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const user= new mongoose.Schema({
     name:String,
     price:Number,
     dateAdded:Date,
     category:String,
     target:String,
     material:String,
     size:Number,
     sale:Number,
     img:String,
     unit:String,
     brand:String,
     color:Object,
     description:String

},{collection:'product'});

const productModel = new mongoose.model("product",user);


 var properties = "size";
var ob= { type : ['dog', 'cat'] ,name:"tuan"};
var tr="category:Đầm";
var t="size";
var c="XXL"
var ob={category:"Đầm",size:{$in:["XXL","XS"]}};

// var objectFilter={category:"Đầm",target:"Nữ"}
// console.log(JSON.stringify(objectFilter));
// var c=JSON.parse(JSON.stringify(objectFilter));
// console.log(c.category);

// var a=[4,5,6];
// ob={category:"Đầm",target:"Nữ",brand:{$in:["Prada","Gucci"]},material:{$in:[]},color:{$in:[]},size:{$in:[]}}
console.log(user.query.+"đ");
// let name="Đầm thắt lưng";
// let sale=0;
// productModel.find({name,sale})
// .then((data)=>{
//      console.log(data);
// })



module.exports =productModel