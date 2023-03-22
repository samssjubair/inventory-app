const { getSupplierService, saveSupplierService, updateSupplierService, getSpecificSupplierService } = require("../services/supplier.service");

module.exports.getAllSuppliers = async (req,res,next)=>{
    // console.log("get all Suppliers")
    try {
        const Suppliers= await getSupplierService();
        res.status(200).json({
            success: true,
            message: "All Suppliers",
            data: Suppliers
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "could not get Suppliers",
            error: error.message
        })
    }
}

module.exports.saveASupplier = async (req,res,next)=>{
    // console.log('hi')
    try {
        const product=await saveSupplierService(req.body);
        res.status(200).json({
            success: true,
            message: "Supplier inserted successfully",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not save Supplier",
            error: error.message
        })
    }
}

module.exports.getSupplierById= async (req,res,next)=>{    
    try {
        const {id}=req.params;
        const Supplier= await getSpecificSupplierService(id);
        res.status(200).json({
            success: true,
            message: "Supplier found",
            data: Supplier
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not find Supplier",
            error: error.message
        })
    }
}

module.exports.updateSupplierById = async (req,res,next)=>{
    try {
        const {id}=req.params;
        const result= await updateSupplierService(id,req.body)
        res.status(200).json({
            success: true,
            message: "Supplier updated successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not update Supplier",
            error: error.message
        })
    }
}