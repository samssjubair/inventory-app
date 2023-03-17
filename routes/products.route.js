const express=require('express');
const { saveAProduct, getAllProduct, updateProductById, bulkUpdateProducts, deleteProductById, bulkDeleteProducts } = require('../controller/products.controller');
const router=express.Router();

router.get('/',getAllProduct).post('/',saveAProduct);

router.patch('/bulk-update',bulkUpdateProducts)
router.delete('/bulk-delete',bulkDeleteProducts)
router.patch('/:id',updateProductById)
router.delete('/:id',deleteProductById)

module.exports=router;