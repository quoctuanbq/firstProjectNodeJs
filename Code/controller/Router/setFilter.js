const express=require('express');
const router=express.Router();
const productModel=require("../database/productModel")

router.post("/setFilter",(req, res) => {
    var objectFilter=JSON.parse(req.body.objectFilter);
 productModel.aggregate([
     {$match:objectFilter},
        {$project:{_id:0,_v:0,description:0,sale:0,unit:0,dateAdded:0,target:0,name:0,img:0,category:0,price:0}},
        {$project:{allProperty:{$objectToArray:"$$ROOT"}}},
        {$unwind:"$allProperty"},
        {$group:{_id:null,allProperty:{$addToSet:"$allProperty.k"}}}
    ])
    .then((data) => {
        res.json(data[0].allProperty.sort());
    })
    .catch((err) => {
        res.json(err);
    })
})


router.post("/setDetailsProperty",(req, res) => {
    var property=req.body.property;
    var objectFilter=JSON.parse(req.body.objectFilter);
    var model;
    if(property!="color")
    model=  productModel.aggregate([
        {$match:objectFilter},
        {$group:{_id:"$"+property}},
        {$group:{_id:null,detailProperty:{$addToSet:"$_id"}}}
    ])
    else
    model= productModel.aggregate([
        {$match:objectFilter},
        {$group:{_id:"$"+property+".img"}},
        {$group:{_id:null,detailProperty:{$addToSet:"$_id"}}}])
        
    model.then((data) => {
        res.json(data[0].detailProperty)
    })
    .catch((err) => {
        res.json(err)
    })

    
})

router.post("/findMaxMinPrice",(req, res) => {
    
    var objectFilter=JSON.parse(req.body.objectFilter);
    productModel.aggregate([
        {$match:objectFilter},
        {$group:{_id:null,maxPrice:{$max:"$price"},minPrice:{$min:"$price"}}}
    ])
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json(error)
    })
})












module.exports=router;