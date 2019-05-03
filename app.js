const express=require('express');
const app=express();
const morgan=require('morgan');
const productRoutes=require('./routes/products');
const orderRoutes=require('./routes/orders');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

mongoose.connect("mongodb+srv://navdin:FM5UCOihtL5P9R2u@nodejsecommerce-utuje.mongodb.net/test?retryWrites=true",{ useNewUrlParser: true } ).then(function(){
    console.log("connection secured");
}).catch(function(error){
    console.log(error);
});
//FM5UCOihtL5P9R2u
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization" );
    if(req.method==='OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    // console.log('came to cors');
    // res.status(200);
    // return res.json({});;
    next();
});
// app.use(function(req, res, next){
//     return res.status(200).json({
//         body:{name:req.body.name,
//         price:req.body.price}
//     });
// });
console.log('before all routes in app.js');

app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
console.log('after all routes in app.js');
app.use(function(req, res, next){
    //res.statu;
    console.log('aap.js middleware');
    res.json({
        message: 'url match failed.'
    });

});


app.use(function(error, req, res, next){
    console.log(error);

    res.json({
        message_error: error
    });

});
module.exports=app;