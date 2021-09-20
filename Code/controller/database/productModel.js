const mongoose = require('mongoose')


 mongoose.connect('mongodb://localhost/cloudshop', {
  useNewUrlParser: true,
 useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const shema= new mongoose.Schema({
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

const productModel = new mongoose.model("product",shema);


 var properties = "size";
var ob= { type : ['dog', 'cat'] ,name:"tuan"};
var tr="category:Đầm";
var t="size";
var c="XXL"
var ob={category:"Đầm",size:{$in:["XXL","XS"]}};

// productModel.aggregate([
//      {$match:JSON.parse(JSON.stringify(ob))}

//  ])
// .then((data) => {
//    console.log(data);
// }) 
// .catch((err) => {
//   console.log(err.message);
// }) 


module.exports =productModel;