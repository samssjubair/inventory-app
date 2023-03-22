const { getStockService, saveStockService, updateStockService, getSpecificStockService } = require("../services/stock.service");

module.exports.getAllStock = async (req,res,next)=>{
    try {
        
        let filters= {...req.query};
        const excludeFields= ['sort','limit','page','fields'];
        excludeFields.forEach(field=> delete filters[field]);

        let filtersString= JSON.stringify(filters);
        filtersString=filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match=>`$${match}`)
        filters=JSON.parse(filtersString)

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
        
        const result= await getStockService(filters,queries);

        res.status(200).json({
            success: true,
            message: "All Stocks",
            data: stock
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "could not get Stock",
            error: error.message
        })
    }
}

module.exports.saveAStock = async (req,res,next)=>{
    try {
        const stock=await saveStockService(req.body);
        res.status(200).json({
            success: true,
            message: "Stock inserted successfully",
            data: stock
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not save Stock",
            error: error.message
        })
    }
}

module.exports.getStockById= async (req,res,next)=>{    
    try {
        const {id}=req.params;
        const stock= await getSpecificStockService(id);
        res.status(200).json({
            success: true,
            message: "Stock found",
            data: stock
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not find Stock",
            error: error.message
        })
    }
}

module.exports.updateStockById = async (req,res,next)=>{
    try {
        const {id}=req.params;
        const result= await updateStockService(id,req.body)
        res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "could not update Stock",
            error: error.message
        })
    }
}