
const Product = require("../models/Product");
const { getProductService, saveProductService, updateBulkProductService } = require("../services/product.service");

module.exports.getAllProduct= async (req,res,next)=>{
    try {
        const result= await getProductService();
        res.status(200).json({
            success: true,
            message: 'Data fetch successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not save",
            error: error.message
        })
    }
}

module.exports.saveAProduct= async (req,res,next)=>{
    try {
        // const product= new Product(req.body);
        const product= await saveProductService(req.body)
        product.logger();
        // const result= await product.save();

        res.status(200).json({
            success: true,
            message: "Data inserted successfully",
            data: product
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "could not save",
            error: error.message
        })
    }
}

module.exports.updateProductById= async (req,res,next)=>{
    try {
        // const product= new Product(req.body);
        // const product= await updateProductService(id,req.body)
        const {id}=req.params;
        const product= await Product.findById(id);
        const result= await product.set(req.body).save();

        res.status(200).json({
            success: true,
            message: "Data updated successfully",
            data: product
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "could not update",
            error: error.message
        })
    }
}

module.exports.bulkUpdateProducts= async (req,res,next)=>{
    try {
        // const product= new Product(req.body);
        const result= await updateBulkProductService(req.body)

        res.status(200).json({
            success: true,
            message: "Data updated successfully",
            data: result
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "could not update",
            error: error.message
        })
    }
}