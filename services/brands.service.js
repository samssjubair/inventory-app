const Brand = require("../models/Brand");

module.exports.getBrandService= async()=>{
    const brands= await Brand.find();
    return brands;
}

module.exports.saveBrandService= async (data)=>{
    const product= await Brand.create(data)
    return product;
}

module.exports.updateBrandService= async (id,data)=>{
    const result = await Brand.updateOne({_id : id},{$set: data},{
        runValidators: true
    });
    return result;
}

module.exports.getSpecificBrandService= async (id)=>{
    const result= await Brand.findOne({_id: id});
    return result;
}