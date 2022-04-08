const productModel=require('../database/productModel')
const express=require('express')
const router=express.Router()
const app = express();
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/pr', (req, res,next) => {
    res.locals.user={th:"hehe"};
    next();
},(req, res)=>{
    console.log(res.locals.user);
    res.json("dd")
})
router.get('/pr1', (req, res)=>{
    console.log(res.locals.user+"r");
})

router.post('/findByCategory',async(req,res)=>{
    var objectFilter=JSON.parse(req.body.objectFilter);
   await productModel.aggregate([
    {$match:objectFilter},
     {$group: { _id:"$name" ,price:{$first:"$price"},img:{$first:"$img"},id:{$first:"$_id"}}},
    {$sort:{name:1}}
    ])
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
    
})


router.post('/findAllColor',async (req,res)=>{
    var productName=req.body.name;
    var objectFilter=JSON.parse(req.body.objectFilter);

    productModel.aggregate([
    {$match:{"name":productName}},
    {$match:objectFilter},
    {$group:{_id:"$color.name",img:{$first:"$color.img"},id:{$first:"$_id"}}}
])
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
    
})

router.post("/findById", async (req, res)=>{
    var productId=req.body.id;
   await productModel.find({_id: productId})
    .then((data)=>{
       res.json(data)
    })
    .catch((error)=>{
        res.json(error)
    })
    
})

router.post('/findTotalByCategory',async(req,res)=>{
    var numberInPage= Number(req.body.numberInPage);
    var objectFilter=JSON.parse(req.body.objectFilter);
    await productModel.aggregate([
     {$match:objectFilter},
     {$group: { _id:"$name" ,price:{$first:"$price"},img:{$first:"$img"},id:{$first:"$_id"}}}
     ,{$count:"total"}]
     )
    .then((data)=>{
        let allRecord = data[0].total;
        let totalPage= Math.round(allRecord/numberInPage);
        if(totalPage*numberInPage<allRecord)totalPage++;
        res.json(totalPage);
    })
    .catch((err)=>{
        res.json(err)
    })
    
})

router.post('/findAllProInPageByCategory',async(req,res)=>{
    var index=req.body.index;
    var numberInPage= Number(req.body.numberInPage);
    var objectFilter=JSON.parse(req.body.objectFilter);
    res.locals._search = {
        enabled: false,
      };
    Object.assign(res.locals._search, {
        he:"dd"
      });

   await productModel.aggregate([
    {$match:objectFilter},
     {$group: { _id:"$name" ,price:{$first:"$price"},img:{$first:"$img"},id:{$first:"$_id"}}},
     {$sort:{price:1}}
    ]
     )
    .skip((index-1)*numberInPage)
    .limit(numberInPage)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err.message)
    })
    
})



module.exports =router;