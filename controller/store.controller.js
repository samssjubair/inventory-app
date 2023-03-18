const { getStoreService, saveStoreService, updateStoreService, getSpecificStoreService } = require("../services/store.service");

module.exports.getAllStores = async (req,res,next)=>{
    console.log("get all Stores")
    try {
        const stores= await getStoreService();
        res.status(200).json({
            success: true,
            message: "All Stores",
            data: stores
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "could not get stores",
            error: error.message
        })
    }
}

module.exports.saveAStore = async (req,res,next)=>{
    try {
        const product=await saveStoreService(req.body);
        res.status(200).json({
            success: true,
            message: "Store inserted successfully",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not save Store",
            error: error.message
        })
    }
}

module.exports.getStoreById= async (req,res,next)=>{    
    try {
        const {id}=req.params;
        const store= await getSpecificStoreService(id);
        res.status(200).json({
            success: true,
            message: "Store found",
            data: store
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not find Store",
            error: error.message
        })
    }
}

module.exports.updateStoreById = async (req,res,next)=>{
    try {
        const {id}=req.params;
        const result= await updateStoreService(id,req.body)
        res.status(200).json({
            success: true,
            message: "Store updated successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not update Store",
            error: error.message
        })
    }
}