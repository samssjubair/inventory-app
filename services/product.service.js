const Brand = require("../models/Brand");
const Product = require("../models/Product");

module.exports.getProductService= async (filters,queries)=>{
    const result= await Product.find(filters).sort(queries.sortBy).select(queries.fields).skip(queries.skip).limit(queries.limit).populate('brand');
    return result
}

module.exports.saveProductService= async (data)=>{
    const product= await Product.create(data)
    const {_id,brand}=product;
    const res= await Brand.updateOne(
        {_id: brand.id},
        {$push : {products: _id}}
    );
    console.log(res)
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

module.exports.deleteProductService= async (id,data)=>{
    const result = await Product.deleteOne({_id : id});
    return result;
}

module.exports.bulkDeleteProductService= async (ids)=>{
    console.log(ids)
    const result = await Product.deleteMany({});
    return result;
}