
const Product = require("../models/Product");
const { getProductService, saveProductService, updateBulkProductService, deleteProductService, bulkDeleteProductService } = require("../services/product.service");

module.exports.getAllProduct= async (req,res,next)=>{
    try {
        let filters= {...req.query};
        const excludeFields= ['sort','limit','page','fields'];
        excludeFields.forEach(field=> delete filters[field]);

        let filtersString= JSON.stringify(filters);
        filtersString=filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match=>`$${match}`)
        filters=JSON.parse(filtersString)

        // console.log(filtersString)
        const queries={};

        if(req.query.page){
            const {page=1,limit=10}= req.query;
            const skip=(page-1)*10;
            queries.skip=skip;
            queries.limit=limit;

        }
        console.log(queries)

        if(req.query.sort){
            const sortBy=req.query.sort.split(',').join(' ');
            queries.sortBy=sortBy
        }

        if(req.query.fields){
            
            const fields=req.query.fields.split(',').join(' ');
            queries.fields=fields
        }
        
        const result= await getProductService(filters,queries);
        res.status(200).json({
            success: true,
            message: 'Data fetch successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not load",
            error: error.message
        })
    }
}

module.exports.saveAProduct= async (req,res,next)=>{
    try {
        const product= await saveProductService(req.body)
        product.logger();

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
        const {id}=req.params;
        const product= await updateProductService(id,req.body)
        
        // const product= await Product.findById(id);
        // const result= await product.set(req.body).save();

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

module.exports.deleteProductById= async (req,res,next)=>{
    try {
        // const product= new Product(req.body);
        const {id}=req.params;
        const product= await deleteProductService(id,req.body)
        
        // const product= await Product.findById(id);
        // const result= await product.set(req.body).save();

        if(!product.deletedCount){
            res.status(400).json({
                success: false,
                message: "Couldn't delete",
                data: product
            })
        }

        res.status(200).json({
            success: true,
            message: "Data deleted successfully",
            data: product
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not delete",
            error: error.message
        })
    }
}

module.exports.bulkDeleteProducts= async (req,res,next)=>{
    try {
        // const product= new Product(req.body);
        const result= await  bulkDeleteProductService(req.body.ids)

        res.status(200).json({
            success: true,
            message: "Bulk delete successfully",
            data: result
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "could not delete",
            error: error.message
        })
    }
}
