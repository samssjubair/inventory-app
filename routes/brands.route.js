const express= require('express');
const { getAllBrands, saveABrand } = require('../controller/brands.controller');
const router=express.Router();

router.route('/').get(getAllBrands).post(saveABrand);

module.exports = router;