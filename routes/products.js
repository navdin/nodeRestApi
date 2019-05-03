const express=require('express');
const router=express.Router();
const prod=require('../models/product');
const mongoose=require('mongoose');
const orderRoutes=require('./orders');
console.log('came to products.js');



router.get('/:productId', function(req, res, next){


    // console.log('came here product get');
    const id=req.params.productId;
    prod.find({_id: id})
    .exec()
    .then(function(result){
        console.log(result);
        if(result.length>0){
        res.status(200).json(
            
            result.map(function(doc){
                return {
                    productId:doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: 'GET',
                    url: 'localhost:3000/products/'+doc._id
                }

            })
        );
        }
        else{
            res.status(200).json({
                message:'No data found'
            });
        }
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({
            error:error
        });

    });

    
   //next(error);
});





router.get('/', function(req, res, next){


    // console.log('came here product get');
    const id="5cb732ec19f8d22fe0cf81a1";
    prod.find()
    .exec()
    .then(function(result){
        console.log(result);
        if(result.length>0){
        res.status(200).json(
            
            result.map(function(doc){
                return {
                    productId:doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: 'GET',
                    url: 'localhost:3000/products/'+doc._id
                }

            })
        );
        }
        else{
            res.status(200).json({
                message:'No data found'
            });
        }
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({
            error:error
        });

    });

    
   //next(error);
});

router.post('/add', function(req, res, next){
    const prodOb=new prod({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    });
    //console.log('came to post method');
    prodOb.save().then(function(result){
        console.log(result);
        res.status(200).json({
            success:'product added',
            product: {
                name:req.body.name,
                price: req.body.price,
                request: 'GET',
                url: 'localhost:3000/products/'+prodOb._id
            }
        });
    }).catch(function(error){
        console.log(error);
        res.status(500).json({
            orders:'error!',
            ErrorDetails: error
        });
    });
   

});

router.patch('/:productId', function(req, res, next){
    const updateOps={};

    const reqBody=req.body;
    console.log(reqBody);

    for(const op of reqBody){
        //console.log("op="+op+", op.key="+op.key+", op.value="+op.value);
        updateOps[op.key]=op.value;
    }
    console.log(updateOps);
    console.log(req.params.productId);

    prod.update({_id:req.params.productId},{$set:updateOps})
    .then(function(result){

        res.status(200).json({
            message: 'Success. Product updated.',
            result:result
        });

    }).catch(function(error){
        res.status(500).json({
            message:error
        });
    });
    
})

router.delete('/:productId', function(req, res, next){
    const id=req.params.productId;
    //console.log('came delete id='+id);

    prod.deleteOne({_id:id}).exec().then(function(result){
      
        res.status(200).json({
            message: 'Success. Product deleted.', 
            result: result
        });

        // next();
       // console.log('within delete res');

    }).catch(function(result){
        res.status(500).json({
            message: result.message
        });
    });
   // console.log('after delete response');
});
// router.use('/place', orderRoutes);

module.exports=router;