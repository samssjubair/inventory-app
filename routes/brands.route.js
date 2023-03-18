const express= require('express');
const { getAllBrands, saveABrand, updateBrandById, getBrandById } = require('../controller/brands.controller');
const router=express.Router();

router.route('/').get(getAllBrands).post(saveABrand);

router.route('/:id').get(getBrandById).patch(updateBrandById);

module.exports = router;