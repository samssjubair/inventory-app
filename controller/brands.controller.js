const { getBrandService, saveBrandService, updateBrandService, getSpecificBrandService } = require("../services/brands.service");

module.exports.getAllBrands = async (req,res,next)=>{
    console.log("get all brands")
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

module.exports.getBrandById= async (req,res,next)=>{    
    try {
        const {id}=req.params;
        const brand= await getSpecificBrandService(id);
        res.status(200).json({
            success: true,
            message: "brand found",
            data: brand
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not find brand",
            error: error.message
        })
    }
}

module.exports.updateBrandById = async (req,res,next)=>{
    try {
        const {id}=req.params;
        const result= await updateBrandService(id,req.body)
        res.status(200).json({
            success: true,
            message: "brand updated successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not update brand",
            error: error.message
        })
    }
}