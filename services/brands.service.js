const Brand = require("../models/Brand");

module.exports.getBrandService= async()=>{
    const brands= await Brand.find();
    return brands;
}

module.exports.saveBrandService= async (data)=>{
    const product= await Brand.create(data)
    return product;
}