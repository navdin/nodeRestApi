const express=require('express');
const router=express.Router();

console.log('came to orders.js');


router.get('/', function(req, res, next){
    res.status(200).json({
        oders:'list of orders'
    });
});

router.post('/place', function(req, res, next){
    // res.status(200).json({
    //     orders:'inside order placed'
    // });
    console.log('inside orders paced');
});

router.patch('/:orderId', function(req, res, next){
    res.status(200).json({
        message:'patched '+req.param.orderId
    });
})

router.delete('/:orderId', function(req, res, next){
    res.status(200).json({
        message: 'order '+req.param.orderId+' deleted'
    });
});

module.exports=router;
