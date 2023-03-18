const { getBrandService, saveBrandService } = require("../services/brands.service");

module.exports.getAllBrands = async (req,res,next)=>{
    try {
        const brands= await getBrandService();
        res.status(200).json({
            success: true,
            message: "All brands",
            data: brands
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "could not get brands",
            error: error.message
        })
    }
}

module.exports.saveABrand = async (req,res,next)=>{
    try {
        const product=await saveBrandService(req.body);
        res.status(200).json({
            success: true,
            message: "brand inserted successfully",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not save brand",
            error: error.message
        })
    }
}