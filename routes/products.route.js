const express=require('express');
const { saveAProduct, getAllProduct, updateProductById, bulkUpdateProducts } = require('../controller/products.controller');
const router=express.Router();

router.get('/',getAllProduct).post('/',saveAProduct);

router.patch('/bulk-update',bulkUpdateProducts)
router.patch('/:id',updateProductById)

module.exports=router;