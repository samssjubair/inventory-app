const Supplier = require("../models/Supplier");

module.exports.getSupplierService= async()=>{
    const Suppliers= await Supplier.find().populate('brand');
    return Suppliers;
}

module.exports.saveSupplierService= async (data)=>{
    const product= await Supplier.create(data)
    return product;
}

module.exports.updateSupplierService= async (id,data)=>{
    const result = await Supplier.updateOne({_id : id},{$set: data},{
        runValidators: true
    });
    return result;
}

module.exports.getSpecificSupplierService= async (id)=>{
    const result= await Supplier.findOne({_id: id});
    return result;
}