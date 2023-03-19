const express= require('express');
const { getAllSuppliers, saveASupplier, updateSupplierById, getSupplierById } = require('../controller/supplier.controller');
const router=express.Router();

router.route('/').get(getAllSuppliers).post(saveASupplier);

router.route('/:id').get(getSupplierById).patch(updateSupplierById);

module.exports = router;