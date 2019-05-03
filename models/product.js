const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    price:Number,
    type:String
});

// const productDetailSchema=mongoose.Schema({
//     _id: mongoose.Types.ObjectId,
//     name: String,
//     fat:Number,
//     choles:Number
// });

module.exports=mongoose.model('product', productSchema);
//module.exports=mongoose.model('prodDetail', productDetailSchema);
