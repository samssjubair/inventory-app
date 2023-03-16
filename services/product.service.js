const Product = require("../models/Product");

module.exports.getProductService= async ()=>{
    const result= await Product.find({});
    return result
}

module.exports.saveProductService= async (data)=>{
    const product= await Product.create(data)
    return product
}

module.exports.updateProductService= async (id,data)=>{
    const result = await Product.updateOne({_id : id},{$set: data},{
        runValidators: true
    });
    return result;
}

module.exports.updateBulkProductService= async (data)=>{
    const products=[];
    console.log(data)
    data.ids.forEach(product => {
        products.push(Product.updateOne({_id: product.id},product.data))
    });
    const result =await Promise.all(products);

    
    return result;
}