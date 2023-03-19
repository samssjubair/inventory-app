const express=require('express');
const { saveAProduct, getAllProduct, updateProductById, bulkUpdateProducts, deleteProductById, bulkDeleteProducts, fileUpload } = require('../controller/products.controller');
const router=express.Router();
const multer  = require('multer');
const upload = require('../middleware/uploader');


router.post("/file-upload",upload.single('image'),fileUpload);

router.get('/',getAllProduct).post('/',saveAProduct);

router.patch('/bulk-update',bulkUpdateProducts)
router.delete('/bulk-delete',bulkDeleteProducts)
router.patch('/:id',updateProductById)
router.delete('/:id',deleteProductById)

module.exports=router;