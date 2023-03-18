const { getCategoryService, saveCategoryService, updateCategoryService, getSpecificCategoryService } = require("../services/category.service");

module.exports.getAllCategory = async (req,res,next)=>{
    // console.log("get all Category")
    try {
        const category= await getCategoryService();
        res.status(200).json({
            success: true,
            message: "All Categorys",
            data: category
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "could not get Category",
            error: error.message
        })
    }
}

module.exports.saveACategory = async (req,res,next)=>{
    try {
        const category=await saveCategoryService(req.body);
        res.status(200).json({
            success: true,
            message: "Category inserted successfully",
            data: category
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not save category",
            error: error.message
        })
    }
}

module.exports.getCategoryById= async (req,res,next)=>{    
    try {
        const {id}=req.params;
        const category= await getSpecificCategoryService(id);
        res.status(200).json({
            success: true,
            message: "Category found",
            data: category
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not find category",
            error: error.message
        })
    }
}

module.exports.updateCategoryById = async (req,res,next)=>{
    try {
        const {id}=req.params;
        const result= await updateCategoryService(id,req.body)
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not update category",
            error: error.message
        })
    }
}