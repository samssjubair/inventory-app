const Store = require("../models/Store");

module.exports.getStoreService= async()=>{
    const stores= await Store.find();
    return stores;
}

module.exports.saveStoreService= async (data)=>{
    const product= await Store.create(data)
    return product;
}

module.exports.updateStoreService= async (id,data)=>{
    const result = await Store.updateOne({_id : id},{$set: data},{
        runValidators: true
    });
    return result;
}

module.exports.getSpecificStoreService= async (id)=>{
    const result= await Store.findOne({_id: id});
    return result;
}