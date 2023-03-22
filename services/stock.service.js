const Stock = require("../models/Stock");
const mongoose = require('mongoose');
const ObjectId= mongoose.Types.ObjectId;

module.exports.getStockService= async()=>{
    // const stock= await Stock.find();
    const stock= await Stock.aggregate([
        {
            $match: {}
        },
        {
            $project: {
                // store: 1,
                price: {$convert: {input: '$price', to: 'int'}},
                quantity: {$convert: {input: '$quantity', to: 'int'}},
            }
        },
        {
            $group: {
                _id: '$stores.name', totalProductPrice: {$sum: {$multiply: ['$price','$quantity']}}
            }
        }
    ]);
    console.log(stock)
    // return stock;
}

module.exports.saveStockService= async (data)=>{
    // console.log('hola')
    const product= await Stock.create(data)
    return product;
}

module.exports.updateStockService= async (id,data)=>{
    const result = await Stock.updateOne({_id : id},{$set: data},{
        runValidators: true
    });
    return result;
}

module.exports.getSpecificStockService= async (id)=>{
    // const result= await Stock.findOne({_id: id}).populate('brand.id').populate('store.id').populate('productId');

    // using aggregation

    const result= await Stock.aggregate([
        {
            $match:{_id: new ObjectId(id)},
        },
        {
            $project: {
                name: 1,
                quantity: 1,
                category: 1,
                price: 1,
                'brand.name': {$toLower: '$brand.name'}
            }
        },
        {
            $lookup:{
                from: 'brands',
                localField: 'brand.name',
                foreignField: 'name',
                as: 'branddetails'
            }
        }
    ])

    return result;
}