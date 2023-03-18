const Category = require("../models/Category");

module.exports.getCategoryService= async()=>{
    const category= await Category.find();
    return category;
}

module.exports.saveCategoryService= async (data)=>{
    const product= await Category.create(data)
    return product;
}

module.exports.updateCategoryService= async (id,data)=>{
    const result = await Category.updateOne({_id : id},{$set: data},{
        runValidators: true
    });
    return result;
}

module.exports.getSpecificCategoryService= async (id)=>{
    const result= await Category.findOne({_id: id});
    return result;
}